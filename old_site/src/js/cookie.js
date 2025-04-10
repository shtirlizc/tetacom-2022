import { Notification } from './notification';

export const Cookie = {
  storageKey: 'teta__cookie',

  init() {
    const savedCookie = localStorage.getItem(this.storageKey);

    if (!savedCookie) {
      setTimeout(() => Notification.openDefaultNotifications('cookie'), 200);
    }

    this.listen();
  },

  listen() {
    document.getElementById('save-cookie')?.addEventListener('click', () => {
      localStorage.setItem(this.storageKey, 'saved');
    });
  },
};
