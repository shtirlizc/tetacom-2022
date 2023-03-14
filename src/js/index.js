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
import { Vacancies } from './vacancies';
import { StartScreenSwiper } from './start-screen-swiper';

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
  Vacancies.init();
  StartScreenSwiper.init();
});
