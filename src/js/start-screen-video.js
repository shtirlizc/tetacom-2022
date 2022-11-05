export function startScreenVideo() {
  const video = document.querySelector(".js-video");

  if (video) {
    setTimeout(() => {
      video.classList.remove("hidden");
      video.querySelector("video").play();
    }, 500);
  }
}
