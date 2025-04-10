export function mobileMenu() {
  let isClosed = false;
  const toggleBtn = document.getElementById("hamburger");
  const bg = document.querySelector("._header__bg");
  const nav = document.querySelector("._header__navigation");
  const body = document.querySelector("html");

  const openMenu = (bg, nav, body) => {
    bg.classList.add("active");
    setTimeout(() => {
      bg.classList.add("visible");
      nav.classList.add("active");
      body.classList.add("mobile-menu");
    }, 50);
  };

  const closeMenu = (bg, nav, body) => {
    bg.classList.remove("visible");
    nav.classList.remove("active");
    body.classList.remove("mobile-menu");

    setTimeout(() => {
      bg.classList.remove("active");
    }, 500);
  };

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (isClosed) {
        toggleBtn.classList.remove("is-open");
        toggleBtn.classList.add("is-closed");
        isClosed = false;
        closeMenu(bg, nav, body);
      } else {
        toggleBtn.classList.remove("is-closed");
        toggleBtn.classList.add("is-open");
        isClosed = true;
        openMenu(bg, nav, body);
      }
    });
  }

  if (bg) {
    bg.addEventListener("click", () => {
      toggleBtn.classList.remove("is-open");
      toggleBtn.classList.add("is-closed");
      isClosed = false;
      closeMenu(bg, nav, body);
    });
  }
}
