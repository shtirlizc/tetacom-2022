// import { textField } from "./textField";
// import { phoneMask } from "./phoneMask";
// import { mobileMenu } from "./mobileMenu";
// import { gumshoe } from "./gumshoe";
// import { map } from "./map";
// import { Modal } from "./modal";
// import { Form } from "./modal";

import { PageYOffset } from "./pageYOffset";
import { startScreenVideo } from "./start-screen-video";
import { Slider } from "./swiper";

window.addEventListener("load", () => {
  PageYOffset.init();
  startScreenVideo();
  Slider.init();
  // mobileMenu();
  // textField();
  // phoneMask();
  // gumshoe();
  // map();
  // Modal.init();
  // Form.init();
});
