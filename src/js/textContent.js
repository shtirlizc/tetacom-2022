require('./vendors/fslightbox-pro-3.3.2/fslightbox');

export function textContent() {
  const textContent = document.querySelectorAll('._text-content');

  Array.from(textContent).forEach((item) => {
    const images = item.querySelectorAll('img');

    Array.from(images).forEach((img) => {
      img.parentNode.innerHTML = `<a data-fslightbox="gallery" href="${img.src}">${img.outerHTML}</a>`;
    });

    refreshFsLightbox();
  });
}
