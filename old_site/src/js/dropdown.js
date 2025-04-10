export const Dropdown = {
  dropdownButtons: document.querySelectorAll('.js-dropdown'),
  bgClassName: '._dropdown__bg',
  bodyClassName: '._dropdown__body',
  activeClassName: 'active',
  visibleClassName: 'visible',

  init() {
    this.dropdownButtons.forEach((btn) => {
      const parent = btn.parentNode;

      btn.addEventListener('click', () => {
        this.open(parent);
      });

      parent.querySelector(this.bgClassName).addEventListener('click', () => {
        this.close(parent);
      });
    });
  },

  open(dropdown) {
    const bg = dropdown.querySelector(this.bgClassName);
    const body = dropdown.querySelector(this.bodyClassName);

    bg.classList.add(this.activeClassName);
    body.classList.add(this.activeClassName);
    setTimeout(() => {
      body.classList.add(this.visibleClassName);
    }, 20);
  },

  close(dropdown) {
    const bg = dropdown.querySelector(this.bgClassName);
    const body = dropdown.querySelector(this.bodyClassName);

    bg.classList.remove(this.activeClassName);
    body.classList.remove(this.visibleClassName);
    setTimeout(() => {
      body.classList.remove(this.activeClassName);
    }, 300);
  },
};
