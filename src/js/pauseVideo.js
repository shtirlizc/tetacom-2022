export const PauseVideo = {
  videos: document.querySelectorAll("video"),

  init() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this.play();
      } else {
        this.pause();
      }
    });
  },

  pause() {
    this.videos.forEach((video) => {
      video.pause();
    });
  },

  play() {
    this.videos.forEach((video) => {
      video.play();
    });
  },
};
