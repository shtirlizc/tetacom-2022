import { textField } from './textField';
import { phoneMask } from './phoneMask';
import { mobileMenu } from './mobileMenu';
import { Modal } from './modal';
import { Form } from './modal';
import { PageYOffset } from './pageYOffset';
import { MainSlider } from './mainSlider';
import { Capabilities } from './capabilities';
import { ProductDemoPlayer } from './productDemoPlayer';
import { Dropdown } from './dropdown';
import { Notification } from './notification';
import { Cookie } from './cookie';
import { Vacancies } from './vacancies';
import { StartScreenSwiper } from './start-screen-swiper';
import { Slider } from './slider';
import { AccordionBlock } from './accordion';
import { textContent } from './textContent';

window.Modal = Modal;

window.addEventListener('load', () => {
  PageYOffset.init();
  MainSlider.init();
  mobileMenu();
  textField();
  phoneMask();
  Modal.init();
  Form.init();
  Capabilities.init();
  ProductDemoPlayer.init();
  Dropdown.init();
  Notification.init();
  Vacancies.init();
  StartScreenSwiper.init();
  Cookie.init();
  Slider.init();
  AccordionBlock.init();
  textContent();
});
