import { textField } from './textField';
import { phoneMask } from './phoneMask';
import { mobileMenu } from './mobileMenu';
import { map } from './map';
import { Modal } from './modal';
import { Form } from './modal';
import { PageYOffset } from './pageYOffset';
import { startScreenVideo } from './start-screen-video';
import { Slider } from './swiper';
import { PauseVideo } from './pauseVideo';
import { MainSlider } from './mainSlider';
import { History } from './history';
import { Capabilities } from './capabilities';

window.addEventListener('load', () => {
  PageYOffset.init();
  startScreenVideo();
  MainSlider.init();
  Slider.init();
  mobileMenu();
  textField();
  phoneMask();
  map();
  Modal.init();
  Form.init();
  PauseVideo.init();
  History.init();
  Capabilities.init();
});
