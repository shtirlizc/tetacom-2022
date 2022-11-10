export const PauseVideo = {
  videos: document.querySelectorAll("video"),

  init() {
    // play when video on page
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (this.videos.length) {
      this.videos.forEach((video) => {
        io.observe(video);
      });
    }

    // pause when tab is inactive
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
