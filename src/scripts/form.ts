import { MaskInput } from "maska";

export type TetacomFormId =
  | "feedback"
  | "develop_request"
  | "demo_request"
  | "vacancy_response";

export interface TetacomContactContext {
  product?: string;
  [key: string]: string | undefined;
}

export interface TetacomContactMeta {
  page: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  [key: string]: string | undefined;
}

export interface TetacomContactPayload {
  site: string;
  formId: TetacomFormId;
  name: string;
  email: string;
  phone?: string;
  message: string;
  context: TetacomContactContext;
  meta: TetacomContactMeta;
  captchaToken: string;
  company?: string;
}

export interface TetacomContactFormValues {
  formId: TetacomFormId;
  name: string;
  email: string;
  phone?: string;
  message: string;
  product?: string;
  captchaToken: string;
  company?: string;
}

interface TetacomContactResponse {
  success?: boolean;
  error?: string;
}

interface TurnstileApi {
  render: CallableFunction;
  reset: CallableFunction;
}

interface TetacomFormConfig {
  site: string;
  turnstileScriptSrc: string;
}

type TetacomWindow = Window & {
  tetacomFormConfig?: TetacomFormConfig;
  turnstile?: TurnstileApi;
};

const TURNSTILE_SCRIPT_ID = "turnstile-api";
const PHONE_DIGITS_COUNT = 10;

const initializedForms = new WeakSet<HTMLFormElement>();
const initializedPhoneMasks = new WeakMap<HTMLFormElement, MaskInput>();
let demoRequestProductSyncInitialized = false;
let turnstileScriptPromise: Promise<TurnstileApi> | undefined;

export function createTetacomContactPayload(
  formValues: TetacomContactFormValues,
): TetacomContactPayload {
  const params = new URLSearchParams(window.location.search);

  return {
    site: getFormConfig().site,
    formId: formValues.formId,
    name: formValues.name,
    email: formValues.email,
    phone: formValues.phone,
    message: formValues.message,
    context: {
      product: formValues.product,
    },
    meta: {
      page: window.location.href,
      referrer: document.referrer,
      utm_source: getSearchParam(params, "utm_source"),
      utm_medium: getSearchParam(params, "utm_medium"),
      utm_campaign: getSearchParam(params, "utm_campaign"),
    },
    captchaToken: formValues.captchaToken,
    company: formValues.company,
  };
}

export async function sendTetacomContact(
  payload: TetacomContactPayload,
): Promise<TetacomContactResponse> {
  const endpoint = import.meta.env.PUBLIC_TETACOM_CONTACT_ENDPOINT;

  if (!endpoint) {
    throw new Error("Не настроен endpoint отправки формы");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response
    .json()
    .catch(() => ({}))) as TetacomContactResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Не удалось отправить форму");
  }

  return result;
}

export function initTetacomForms(): void {
  initDemoRequestProductSync();

  const forms = document.querySelectorAll<HTMLFormElement>("form.js-form");

  forms.forEach((form) => {
    if (initializedForms.has(form)) {
      return;
    }

    initializedForms.add(form);
    initTetacomForm(form);
  });
}

function initDemoRequestProductSync(): void {
  if (demoRequestProductSyncInitialized) {
    return;
  }

  demoRequestProductSyncInitialized = true;

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const trigger = target.closest<HTMLElement>('[popovertarget="modal-demo"]');

    if (!trigger) {
      return;
    }

    const demoProductInput = document
      .getElementById("modal-demo")
      ?.querySelector<HTMLInputElement>('form.js-form input[name="product"]');

    if (!demoProductInput) {
      return;
    }

    demoProductInput.value = trigger.dataset.product ?? "";
  });
}

function initTetacomForm(form: HTMLFormElement): void {
  const state = {
    captchaToken: "",
    turnstileWidgetId: "",
    turnstileRenderStarted: false,
  };
  const submitButton = form.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  );
  const turnstileContainer = createTurnstileContainer(form);
  const errorElement = createErrorElement(form);
  const renderTurnstileOnce = () => {
    if (state.turnstileRenderStarted) {
      return;
    }

    state.turnstileRenderStarted = true;
    renderTurnstile(turnstileContainer, state, errorElement);
  };

  initPhoneMask(form);
  scheduleTurnstileRender(form, renderTurnstileOnce);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError(errorElement);
    renderTurnstileOnce();
    validatePhoneInputs(form);

    if (!form.reportValidity()) {
      return;
    }

    if (!state.captchaToken) {
      setError(errorElement, "Подтвердите, что вы не робот");
      return;
    }

    setFormPending(form, submitButton, true);

    try {
      const payload = createTetacomContactPayload(
        getFormValues(form, state.captchaToken),
      );

      await sendTetacomContact(payload);
      resetForm(form, state);
      showSuccessPopover(form);
    } catch (error) {
      setError(
        errorElement,
        error instanceof Error ? error.message : "Не удалось отправить форму",
      );
      resetTurnstile(state);
    } finally {
      setFormPending(form, submitButton, false);
    }
  });
}

function getFormValues(
  form: HTMLFormElement,
  captchaToken: string,
): TetacomContactFormValues {
  const formData = new FormData(form);

  return {
    formId: getFormId(form),
    name: getFormDataValue(formData, "name"),
    email: getFormDataValue(formData, "email"),
    phone: getOptionalFormDataValue(formData, "phone"),
    message: getFormDataValue(formData, "message"),
    product:
      form.dataset.product ?? getOptionalFormDataValue(formData, "product"),
    captchaToken,
    company: getOptionalFormDataValue(formData, "company"),
  };
}

function getFormId(form: HTMLFormElement): TetacomFormId {
  const formId = form.dataset.formId;

  if (isTetacomFormId(formId)) {
    return formId;
  }

  return "feedback";
}

function isTetacomFormId(formId: string | undefined): formId is TetacomFormId {
  return (
    formId === "feedback" ||
    formId === "develop_request" ||
    formId === "demo_request" ||
    formId === "vacancy_response"
  );
}

function getFormDataValue(formData: FormData, name: string): string {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function getOptionalFormDataValue(
  formData: FormData,
  name: string,
): string | undefined {
  const value = getFormDataValue(formData, name);

  return value || undefined;
}

function getSearchParam(
  params: URLSearchParams,
  name: string,
): string | undefined {
  const value = params.get(name)?.trim();

  return value || undefined;
}

function createTurnstileContainer(form: HTMLFormElement): HTMLElement {
  const container = document.createElement("div");
  container.className = "_form__turnstile";

  const submitGroup = form
    .querySelector<HTMLButtonElement>('button[type="submit"]')
    ?.closest("._form__group");

  if (submitGroup) {
    submitGroup.before(container);
  } else {
    form.append(container);
  }

  return container;
}

function createErrorElement(form: HTMLFormElement): HTMLElement {
  const errorElement = document.createElement("p");
  errorElement.className = "_form__error";
  errorElement.setAttribute("role", "alert");
  errorElement.hidden = true;

  const submitGroup = form
    .querySelector<HTMLButtonElement>('button[type="submit"]')
    ?.closest("._form__group");

  if (submitGroup) {
    submitGroup.before(errorElement);
  } else {
    form.append(errorElement);
  }

  return errorElement;
}

function renderTurnstile(
  container: HTMLElement,
  state: {
    captchaToken: string;
    turnstileWidgetId: string;
    turnstileRenderStarted: boolean;
  },
  errorElement: HTMLElement,
): void {
  const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    setError(errorElement, "Не настроен ключ Cloudflare Turnstile");
    return;
  }

  loadTurnstile()
    .then((turnstile) => {
      state.turnstileWidgetId = turnstile.render(container, {
        sitekey: siteKey,
        callback: (token: string) => {
          state.captchaToken = token;
          clearError(errorElement);
        },
        "expired-callback": () => {
          state.captchaToken = "";
        },
        "error-callback": () => {
          state.captchaToken = "";
          setError(errorElement, "Не удалось проверить Cloudflare Turnstile");
        },
      });
    })
    .catch(() => {
      setError(errorElement, "Не удалось загрузить Cloudflare Turnstile");
    });
}

function scheduleTurnstileRender(
  form: HTMLFormElement,
  renderTurnstileOnce: () => void,
): void {
  const popover = form.closest<HTMLElement>("[popover]");

  if (!popover || isPopoverOpen(popover)) {
    renderTurnstileOnce();
    return;
  }

  popover.addEventListener("toggle", (event) => {
    if ("newState" in event && event.newState === "open") {
      renderTurnstileOnce();
    }
  });
  form.addEventListener("focusin", renderTurnstileOnce, { once: true });
}

function isPopoverOpen(popover: HTMLElement): boolean {
  try {
    return popover.matches(":popover-open");
  } catch {
    return false;
  }
}

function loadTurnstile(): Promise<TurnstileApi> {
  const tetacomWindow = getTetacomWindow();

  if (tetacomWindow.turnstile) {
    return Promise.resolve(tetacomWindow.turnstile);
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        tetacomWindow.turnstile ? resolve(tetacomWindow.turnstile) : reject();
      });
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = getFormConfig().turnstileScriptSrc;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      tetacomWindow.turnstile ? resolve(tetacomWindow.turnstile) : reject();
    });
    script.addEventListener("error", reject);
    document.head.append(script);
  });

  return turnstileScriptPromise;
}

function getFormConfig(): TetacomFormConfig {
  const config = getTetacomWindow().tetacomFormConfig;

  if (!config?.site) {
    throw new Error("Не настроен site для отправки формы");
  }

  if (!config.turnstileScriptSrc) {
    throw new Error("Не настроен Cloudflare Turnstile script src");
  }

  return config;
}

function getTetacomWindow(): TetacomWindow {
  return window;
}

function setFormPending(
  form: HTMLFormElement,
  submitButton: HTMLButtonElement | null,
  isPending: boolean,
): void {
  form.setAttribute("aria-busy", String(isPending));

  if (submitButton) {
    submitButton.disabled = isPending;
  }
}

function resetForm(
  form: HTMLFormElement,
  state: { captchaToken: string; turnstileWidgetId: string },
): void {
  form.reset();
  form
    .querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input:not([type='hidden']), textarea")
    .forEach((field) => {
      field.classList.add("empty");
      if (field instanceof HTMLInputElement && isPhoneInput(field)) {
        setPhoneValidity(field);
      }
    });
  resetTurnstile(state);
}

function resetTurnstile(state: {
  captchaToken: string;
  turnstileWidgetId: string;
}): void {
  state.captchaToken = "";

  const { turnstile } = getTetacomWindow();

  if (state.turnstileWidgetId && turnstile) {
    turnstile.reset(state.turnstileWidgetId);
  }
}

function showSuccessPopover(form: HTMLFormElement): void {
  const currentPopover = form.closest<HTMLElement>("[popover]");
  const successPopover = document.getElementById("modal-success");

  if (currentPopover && "hidePopover" in currentPopover) {
    currentPopover.hidePopover();
  }

  if (successPopover && "showPopover" in successPopover) {
    successPopover.showPopover();
  }
}

function setError(errorElement: HTMLElement, message: string): void {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

function clearError(errorElement: HTMLElement): void {
  errorElement.textContent = "";
  errorElement.hidden = true;
}

function initPhoneMask(form: HTMLFormElement): void {
  const phoneInputs = form.querySelectorAll<HTMLInputElement>(".js-phone-mask");

  if (!phoneInputs.length) {
    return;
  }

  initializedPhoneMasks.set(
    form,
    new MaskInput(phoneInputs, {
      preProcess: normalizeRussianPhoneDigits,
    }),
  );

  phoneInputs.forEach((input) => {
    input.addEventListener("input", () => {
      setPhoneValidity(input);
    });
    input.addEventListener("change", () => {
      setPhoneValidity(input);
    });
    setPhoneValidity(input);
  });
}

function validatePhoneInputs(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLInputElement>(".js-phone-mask").forEach((input) => {
    setPhoneValidity(input);
  });
}

function setPhoneValidity(input: HTMLInputElement): void {
  if (
    !input.value.trim() ||
    getRussianPhoneDigits(input.value).length === PHONE_DIGITS_COUNT
  ) {
    input.setCustomValidity("");
    return;
  }

  input.setCustomValidity("Введите телефон полностью");
}

function normalizeRussianPhoneDigits(value: string): string {
  return getRussianPhoneDigits(value);
}

function getRussianPhoneDigits(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("7") || digits.startsWith("8")) {
    return digits.slice(1, PHONE_DIGITS_COUNT + 1);
  }

  return digits.slice(0, PHONE_DIGITS_COUNT);
}

function isPhoneInput(input: HTMLInputElement): boolean {
  return input.classList.contains("js-phone-mask");
}
