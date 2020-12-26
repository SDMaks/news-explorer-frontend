// Сообщения об ошибках при валидации форм на клиенте
export const inputErrorMessages = {
  parolError: 'Пароль должен быть от 8 символов и без пробелов',
  emptyInputError: 'Это обязательное поле',
  emailError: 'Почта введена не корректно',
  inputErrorShortLong: 'Поле для ввода от 2 до 30 символов',
};

// Константы под NewsApi
export const URL_NEWS = 'https://nomoreparties.co/news';
export const NUMBER_ARTICLES = '11'; // количество статей запрашиваемых у ApiNews
export const INDIVIDUAL_TOKEN = '05e26c31c6974b348af622a37d0288b6'; // индивидуальный токен на сайте ApiNews

/* eslint-disable no-undef */

export const body = document.querySelector('.body');
export const bodyMain = document.querySelector('#main-page');

export const popup = body.querySelector('.popup');

export const buttonAutirization = body.querySelector('#buttonAutirization'); // кнопка в шапке Авторизоваться
export const signInPopUp = body.querySelector('#signin_popup');
export const registrationSuccess = body.querySelector('#registration_success'); // попап информации об успешной регистрации
export const closeSignInPopUpButton = signInPopUp.querySelector('#close_signin_popup'); // кнопка X signin_popup
export const switchFormRegistration = signInPopUp.querySelector('#switch_form-registration'); // Переход на форму регистрации нового пользователя
export const closeRegistrationPopup = registrationSuccess.querySelector('#close_registration_popup'); // кнопка закрытия попап информации об успешной регистрации
export const buttonSwitchFromSuccessInfo = registrationSuccess.querySelector('.popup__switch-blue');

export const buttonPopupMobile = body.querySelector('.header__popup-button'); // кнопка открытия меню - мобильная версия
export const buttonPopupMobileClose = body.querySelector('.header__popup-button-close'); // кнопка закрытия меню - мобильная версия

export const mobilePopupMask = body.querySelector('.mobile-popup-mask');
export const menuMobile = body.querySelector('.menu');
export const menuButtonLogoOut = body.querySelector('.menu__button-logo-out');

export const signUpPopUp = body.querySelector('#signup_popup'); // попап блока регистрации
export const closeSignUpPopUpButton = signUpPopUp.querySelector('#close_signup_popup'); // кнопка X signup_popup
export const switchFormEnter = signUpPopUp.querySelector('#switch_form-enter'); // Переход на форму входа

export const formSignIn = document.forms.signinUser; // переменная формы входа
export const formSignUp = document.forms.signupUser; // переменная формы регистрации

export const signInInputArr = formSignIn.querySelectorAll('.popup__input');
export const signUpInputArr = formSignUp.querySelectorAll('.popup__input');

export const buttonFormSignIn = formSignIn.querySelector('#popup_button_signin');
export const buttonFormSignUp = formSignUp.querySelector('#popup_button_signup');

export const buttonAddForms = document.querySelectorAll('.popup__form-button');

export const inputs = body.querySelectorAll('.popup__input-error-message');
export const inputsArr = Array.from(inputs);
export const popUpButtonSignIn = body.querySelector('#buttonAutirization');

export const inputSignupEmail = formSignUp.querySelector('#input-signup-email');
export const inputSignupParol = formSignUp.querySelector('#input-signup-parol');
export const inputSignupName = formSignUp.querySelector('#input-signup-name');

export const inputSignInEmail = formSignIn.querySelector('#input-signin-email');
export const inputSignInParol = formSignIn.querySelector('#input-signin-parol');

export const menuList = body.querySelector('.menu__list');
export const liMain = menuList.querySelector('#li-main');
export const liSaveArticles = menuList.querySelector('#li-save-articles');
export const liAutorization = menuList.querySelector('#li-autorization');
export const liLogOut = menuList.querySelector('#li-log-out');
export const liMenuButtonSpan = menuList.querySelector('.menu__button-span');
export const menuButton = menuList.querySelector('#menuButton'); // кнопка разлог-я пользователя
export const menuButtonNews = menuList.querySelector('#menuButtonNews'); // кнопка разлог-я пользователя новостей

export const respondSereverRegistration = signUpPopUp.querySelector('#respond-serever-registration');
export const respondSereverEnter = signInPopUp.querySelector('#respond-serever-enter');

export const headerSearchForm = bodyMain.querySelector('.header__search-form');
export const headerInput = headerSearchForm.querySelector('.header__input');
export const newsButton = headerSearchForm.querySelector('#news-button');

export const loadingSection = bodyMain.querySelector('.loading');
export const noResultSection = bodyMain.querySelector('.no-result');

export const newsCardSection = bodyMain.querySelector('#news-card');
export const newsCardGrid = document.querySelector('.news-card__grid');
export const newsCardAddButton = bodyMain.querySelector('.news-card__add-button');
export const containerAdd = bodyMain.querySelector('#container');
