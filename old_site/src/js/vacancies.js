import { uniqBy } from 'lodash';

export const Vacancies = {
  vacanciesPage: document.querySelector('._vacancies-page'),
  vacancies: document.querySelectorAll('._vacancies-page__item'),
  filterContainer: document.querySelector('._vacancies-page__filter'),

  init() {
    if (this.vacancies.length && this.filterContainer) {
      this.makeFilter();
    }
  },

  makeFilter() {
    const keys = Array.from(this.vacancies).map((vacancy) => ({
      key: vacancy.dataset.vacancy,
      name: vacancy.dataset.vacancyName,
    }));
    this.filterContainer.querySelector(
      '._vacancies-page__filter-number',
    ).innerText = keys.length;

    const uniqKeys = uniqBy(keys, 'key');
    const filterData = uniqKeys.map((uniqKey) => ({
      key: uniqKey.key,
      name: uniqKey.name,
      count: keys.filter((key) => key.key === uniqKey.key).length,
    }));

    filterData.forEach(({ key, name, count }) => {
      const countEl = document.createElement('span');
      countEl.classList.add('_vacancies-page__filter-number');
      countEl.innerText = String(count);
      const buttonEl = document.createElement('button');
      buttonEl.type = 'button';
      buttonEl.classList.add('_btn', '_btn--small', '_btn--text');
      buttonEl.dataset.type = key;
      buttonEl.innerText = name;
      buttonEl.appendChild(countEl);

      this.filterContainer.appendChild(buttonEl);
    });

    Array.from(this.filterContainer.children).forEach((item) => {
      item.addEventListener('click', this.filterApply.bind(this));
    });

    this.vacanciesPage.style.opacity = '1';
  },

  filterApply(event) {
    const selectedType = event.currentTarget.dataset.type;

    Array.from(this.filterContainer.children).forEach((item) => {
      if (item.dataset.type === selectedType) {
        item.classList.remove('_btn--text');
      } else {
        item.classList.add('_btn--text');
      }
    });

    if (selectedType === 'all') {
      this.vacancies.forEach((item) => {
        item.classList.remove('hidden');
      });
    } else {
      this.vacancies.forEach((item) => {
        if (selectedType === item.dataset.vacancy) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    }
  },
};
