export function newsTags() {
  const param = document.location.search.split('=')[1];

  document.querySelectorAll('.js-news-tags a').forEach((item) => {
    if (param) {
      if (item.dataset.tag === param) {
        item.classList.remove('_btn--text');
      }
    } else {
      document.querySelector('.js-news-tags a')?.classList.remove('_btn--text');
    }
  });
}
