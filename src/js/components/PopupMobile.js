/* eslint-disable no-undef */
export default class PopupMobile {
  constructor(popUpButtonOpen, popUpButtonClose, body, mask, menu, menuButtonLogoOut) {
    this.popUpButtonOpen = popUpButtonOpen;
    this.popUpButtonClose = popUpButtonClose;
    this.body = body;
    this.mask = mask;
    this.menu = menu;
    this.menuButtonLogoOut = menuButtonLogoOut;
    this.imageValue = './images/logout-white.png';
    this.imageValueClose = './images/logout-black.png';
  }

  setEventListeners() {
    this.popUpButtonOpen.addEventListener('click', () => {
      this.openEventHeader();
    });
    this.popUpButtonClose.addEventListener('click', () => {
      this.closeEventHeader();
    });
  }

  openEventHeader() {
    this.popUpButtonOpen.classList.remove('header__popup-button_active');
    this.popUpButtonClose.classList.add('header__popup-button-close_active');
    this.menu.classList.add('menu_active');
    this.body.classList.add('body_mobile-fixed-popup');
    this.mask.classList.add('mobile-popup-mask_active');
    this.renderButton();
  }

  closeEventHeader() {
    this.popUpButtonOpen.classList.add('header__popup-button_active');
    this.popUpButtonClose.classList.remove('header__popup-button-close_active');
    this.menu.classList.remove('menu_active');
    this.body.classList.remove('body_mobile-fixed-popup');
    this.mask.classList.remove('mobile-popup-mask_active');
    this.renderButtonClose();
  }

  renderButton() {
    if ((this.body.id === 'save-news') && (window.matchMedia('(max-width: 767px)').matches)) {
      this.menuButtonLogoOut.src = `${this.imageValue}`;
    }
  }

  renderButtonClose() {
    if (this.body.id === 'save-news') {
      this.menuButtonLogoOut.src = `${this.imageValueClose}`;
    }
  }
}
