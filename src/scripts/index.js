/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import '../pages/index.css';
import PopupForm from '../js/components/PopupForm';
import PopupInfoSuccess from '../js/components/PopupInfoSuccess';
import PopupMobile from '../js/components/PopupMobile';
import Form from '../js/components/Form';
import FormNews from '../js/components/FormNews';
import Header from '../js/components/Header';
import FormProcessing from '../js/components/FormProcessing';
import Authorization from '../js/components/Authorization';
import CardList from '../js/components/CardList';
import Validation from '../js/components/Validation';
import Card from '../js/components/Card';
import { configurl } from '../js/configfile/configfile';
import Api from '../js/api/MainApi';
import NewsApi from '../js/api/NewsApi';

import {
  body,
  bodyMain,
  buttonAutirization,
  signInPopUp,
  closeSignInPopUpButton, //
  switchFormRegistration,
  signUpPopUp,
  closeSignUpPopUpButton,
  switchFormEnter,
  formSignIn,
  formSignUp,
  buttonFormSignIn,
  buttonFormSignUp,
  buttonAddForms,
  inputsArr,
  popUpButtonSignIn,
  inputErrorMessages,
  signInInputArr,
  signUpInputArr,
  inputSignupEmail,
  inputSignupParol,
  inputSignupName,
  inputSignInEmail,
  inputSignInParol,
  registrationSuccess,
  closeRegistrationPopup,
  buttonSwitchFromSuccessInfo,
  buttonPopupMobile,
  buttonPopupMobileClose,
  mobilePopupMask,
  menuMobile,
  liSaveArticles,
  liAutorization,
  liLogOut,
  liMenuButtonSpan,
  menuButton,
  respondSereverRegistration,
  respondSereverEnter,
  menuButtonLogoOut,
  URL_NEWS,
  NUMBER_ARTICLES,
  INDIVIDUAL_TOKEN,
  headerSearchForm,
  headerInput,
  newsButton,
  loadingSection,
  noResultSection,
  newsCardSection,
  newsCardGrid,
  newsCardAddButton,
  containerAdd,
} from '../js/constants/constants';

!(function () {
  const apiNews = new NewsApi(URL_NEWS, NUMBER_ARTICLES, INDIVIDUAL_TOKEN);
  const apiRequest = new Api(configurl.url);

  const popSignIn = new PopupForm(respondSereverEnter,
    buttonPopupMobileClose, signInPopUp, closeSignInPopUpButton,
    body, signUpPopUp, formSignIn, buttonAutirization, switchFormRegistration);
  popSignIn.setEventListeners();
  popSignIn.closeEvent();
  popSignIn.setEventListenersNext();

  const popSignUp = new PopupForm(respondSereverRegistration, buttonPopupMobileClose, signUpPopUp, closeSignUpPopUpButton,
    body, signInPopUp, formSignUp, buttonAutirization, switchFormEnter);
  popSignUp.closeEvent();
  popSignUp.setEventListenersNext();

  const popupInformation = new PopupInfoSuccess(respondSereverRegistration, buttonPopupMobileClose,
    registrationSuccess, closeRegistrationPopup,
    body, signInPopUp, formSignUp, buttonSwitchFromSuccessInfo, signUpPopUp);
  popupInformation.closeEvent();

  const popupMobileHeader = new PopupMobile(
    buttonPopupMobile, buttonPopupMobileClose, body, mobilePopupMask, menuMobile, menuButtonLogoOut,
  );
  popupMobileHeader.setEventListeners();

  const formUserSignIn = new Form(
    inputsArr, Validation, formSignIn, buttonFormSignIn, buttonAddForms, signInPopUp,
    signInInputArr, popUpButtonSignIn, inputErrorMessages, switchFormEnter,
  );

  formUserSignIn.render();

  const formUserSignUp = new Form(
    inputsArr, Validation, formSignUp, buttonFormSignUp, buttonAddForms, signUpPopUp,
    signUpInputArr, popUpButtonSignIn, inputErrorMessages, switchFormRegistration,
  );

  formUserSignUp.render();

  const headerRender = new Header(
    liSaveArticles, liAutorization, liLogOut, liMenuButtonSpan, Api, bodyMain,
  );

  const authorizeUser = new Authorization(apiRequest, menuButton, headerRender);
  authorizeUser.setEventlisenerUser();

  const createCardFunction = (
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    section,
    gridContainer,
    api,
    idCard,
    renderfunction,
  ) => new Card(keyword, title, text, date, source, link,
    image, section, gridContainer, api, idCard, renderfunction);

  const createCardFunctionAdd = new CardList(apiRequest,
    createCardFunction, newsCardGrid);

  const formProcessingRequest = new FormProcessing(apiRequest, apiNews,
    popupInformation, authorizeUser);

  formProcessingRequest.setEventListenersSignUp(
    formSignUp, inputSignupEmail, inputSignupParol, inputSignupName, respondSereverRegistration,
  );

  apiRequest.getUser()
    .then((answer) => {
      headerRender.userButtonLogIn(answer.name);
      headerRender.headerRenderLogIn();
    })
    .catch((err) => {
      if (err.message === 'Необходима авторизация') {
        headerRender.headerRenderLogOut();
        authorizeUser.localStorareClear();
      } else if (err.message !== 'Необходима авторизация') {
        alert(err.message);
      }
    });

  formProcessingRequest.setEventListenersSignIn(
    formSignIn, inputSignInEmail, inputSignInParol, headerRender,
    popSignIn, popupMobileHeader, respondSereverEnter,
  );
  const newsForm = new FormNews(apiNews, headerInput,
    newsButton, headerSearchForm,
    noResultSection, loadingSection, newsCardAddButton,
    newsCardSection, newsCardGrid, apiRequest, createCardFunctionAdd, containerAdd);

  newsForm.setEventListenersInput();
}());
