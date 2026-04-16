import Plyr from "plyr";

const controls = [
  "play-large",
  "play",
  "progress",
  "current-time",
  "mute",
  "volume",
  "fullscreen",
];

export const initVideoPlayers = (root: ParentNode = document) => {
  root
    .querySelectorAll<HTMLElement>("[data-video-player]")
    .forEach((player) => {
      if (player.dataset.plyrReady === "true") {
        return;
      }

      const video = player.querySelector<HTMLVideoElement>("video");

      if (!video) {
        return;
      }

      new Plyr(video, {
        controls,
      });

      player.dataset.plyrReady = "true";
    });
};
