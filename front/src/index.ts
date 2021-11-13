import lazyload from './script/lazyloading'
import './styles/styles.scss'

import Api from "./script/Api";
import Alert from "./script/Alert";
import Validator from "./script/Validator";
import FormControl from "./script/FormControl";
import runSlider from "./script/Slider"
import View from "./script/View";
import Modal from "./script/Modal";

function init() {
  lazyload();
  runSlider();
  const api_url: string = "test_url";
  const AlertService = new Alert();
  const ValidationService = new Validator(AlertService);
  const ApiService = new Api(api_url, AlertService);
  const FormControlService = new FormControl(ApiService, ValidationService, AlertService);
  const feedbackForm = document.querySelector('#feedback-form') as HTMLFormElement;
  if(feedbackForm) FormControlService.listenToFeedbackForm(feedbackForm);
  const ViewService = new View(ValidationService)
  const modalEl = document.querySelector('.modal-root') as HTMLElement;
  if(modalEl) new Modal(modalEl, ViewService, FormControlService);

}

init();
