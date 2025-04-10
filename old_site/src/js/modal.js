const [body] = document.getElementsByTagName('html');

export const Modal = {
  init() {
    // open modal
    const openModalButtons = document.getElementsByClassName('js-open-modal');
    Array.from(openModalButtons).forEach((button) => {
      button.addEventListener('click', (evt) => {
        const targetModalName = evt.currentTarget.dataset.target;
        Modal.findModal(targetModalName);
      });
    });

    // close modal
    const modalBackgrounds = document.getElementsByClassName('_modal__bg');
    Array.from(modalBackgrounds).forEach((modal) => {
      modal.addEventListener('click', (evt) => {
        Modal.close(evt.currentTarget.parentElement);
      });
    });
    const modalCloseButtons = document.getElementsByClassName('_modal__close');
    Array.from(modalCloseButtons).forEach((modal) => {
      modal.addEventListener('click', (evt) => {
        Modal.close(evt.currentTarget.parentElement.parentElement);
      });
    });

    // close all modals
    const closeAllModals = document.getElementById('close-all-modals');
    if (closeAllModals) {
      closeAllModals.addEventListener('click', Modal.closeAll);
    }
  },

  findModal(targetModalName) {
    const allModals = document.getElementsByClassName('js-modal');

    Array.from(allModals).forEach((currentModal) => {
      if (currentModal.dataset.modal === targetModalName) {
        Modal.open(currentModal);
      }
    });
  },

  handleEscape(event) {
    if (event.code === 'Escape') {
      this.closeAll();
    }
  },

  open(currentModal) {
    currentModal.style.display = 'flex';
    setTimeout(() => {
      currentModal.classList.add('open');
    }, 100);
    body.classList.add('modal');
    document.addEventListener('keydown', this.handleEscape.bind(this));
  },

  close(currentModal) {
    currentModal.classList.remove('open');
    body.classList.remove('modal');
    document.removeEventListener('keydown', this.handleEscape.bind(this));
    setTimeout(() => {
      currentModal.style.display = 'none';
    }, 500);
  },

  closeAll() {
    const allModals = document.getElementsByClassName('js-modal');
    Array.from(allModals).forEach((modal) => {
      modal.classList.remove('open');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 500);
    });
    body.classList.remove('modal');

    if (this?.handleEscape) {
      document.removeEventListener('keydown', this.handleEscape.bind(this));
    }
  },

  onSubmit() {
    Modal.findModal('modal-success');
  },
};

export const Form = {
  form: document.querySelector('.js-form'),

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        setTimeout(() => {
          document.getElementById('name').value = '';
          document.getElementById('phone').value = '';
          document.getElementById('message').value = '';
        }, 500);

        Modal.findModal('modal-success');
      });
    }
  },
};
