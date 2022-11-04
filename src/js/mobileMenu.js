export function mobileMenu() {
  const toggleBtn = document.querySelector("._header__menu-toggle");
  const bg = document.querySelector("._header__nav-bg");
  const nav = document.querySelector("._header__nav");
  const header = document.querySelector("._header");
  const body = document.querySelector("html");

  const openMenu = (bg, nav, body) => {
    bg.classList.add("active");
    setTimeout(() => {
      bg.classList.add("visible");
      nav.classList.add("active");
      header.classList.add("active");
      body.classList.add("modal");
    }, 50);

    sessionStorage.setItem("side_menu", true);
  };

  const closeMenu = (bg, nav, body) => {
    bg.classList.remove("visible");
    nav.classList.remove("active");
    body.classList.remove("modal");

    if (!window.pageYOffset) {
      header.classList.remove("active");
    }

    setTimeout(() => {
      bg.classList.remove("active");
    }, 250);

    sessionStorage.setItem("side_menu", false);
  };

  if (toggleBtn) {
    toggleBtn.addEventListener("click", (evt) => {
      if (evt.currentTarget.classList.contains("active")) {
        // close menu
        evt.currentTarget.classList.remove("active");
        closeMenu(bg, nav, body);
      } else {
        // open menu
        evt.currentTarget.classList.add("active");
        openMenu(bg, nav, body);
      }
    });
  }

  if (bg) {
    bg.addEventListener("click", () => {
      // close menu
      toggleBtn.classList.remove("active");
      closeMenu(bg, nav, body);
    });
  }
}
