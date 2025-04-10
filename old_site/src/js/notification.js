export const Notification = {
  bodyClassName: '._notification__body',
  activeClassName: 'active',
  visibleClassName: 'visible',

  items: document.querySelectorAll('.js_notification'),
  openButtons: document.querySelectorAll('.js_notification-open'),
  closeButtons: document.querySelectorAll('.js_notification-close'),

  init() {
    this.openButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this.open(event.target.dataset.notification);
      });
    });

    this.closeButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this.close(event.target.dataset.notification);
      });
    });
  },

  getNotification(notificationName) {
    if (!notificationName) {
      console.error('Error notificationName');
    }

    const currentNotification = this.findItem(notificationName);
    if (!currentNotification) {
      console.error('Error currentNotification');
    }

    return currentNotification;
  },

  open(notificationName) {
    const currentNotification = this.getNotification(notificationName);
    const body = currentNotification.querySelector(this.bodyClassName);

    body.classList.add(this.activeClassName);
    setTimeout(() => {
      body.classList.add(this.visibleClassName);
    }, 20);
  },

  close(notificationName) {
    const currentNotification = this.getNotification(notificationName);
    const body = currentNotification.querySelector(this.bodyClassName);

    body.classList.remove(this.visibleClassName);
    setTimeout(() => {
      body.classList.remove(this.activeClassName);
    }, 300);
  },

  findItem(notificationName) {
    return Object.values(this.items).find(
      (item) => item.dataset.notification === notificationName,
    );
  },

  openDefaultNotifications(name) {
    this.open(name);
  },
};
