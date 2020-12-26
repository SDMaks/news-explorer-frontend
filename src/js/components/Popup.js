export default class Popup {
  constructor(serverMessage, buttonPopupMobileClose, popUp, popupButton, body, popUpNext, form) {
    this.serverMessage = serverMessage;
    this.buttonPopupMobileClose = buttonPopupMobileClose;
    this.popupButton = popupButton;
    this.popup = popUp;
    this.body = body;
    this.popUpNext = popUpNext;
    this.form = form;
  }

  closeEvent() {
    this.popupButton.addEventListener('click', () => {
      this.close();
    });
    this.closeEsc();
    this.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup_is-opened')) {
        this.close();
      }
    });
  }

  openEvent() {
    this.popup.classList.toggle('popup_is-opened');
    this.body.classList.add('body_mask');
    this.serverMessage.textContent = '';
    this.clearContent();
  }

  openCloseEventNext() {
    this.popUpNext.classList.toggle('popup_is-opened');
  }

  closeEsc() {
    this.body.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }

  clearContent() {
    this.form.reset();
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    this.body.classList.remove('body_mask');
    this.formOpen();
    this.clearContent();
    this.removeEventListeners();
  }

  closeNext() {
    this.popup.classList.remove('popup_is-opened');
    this.clearContent();
    this.removeEventListeners();
  }

  formOpen() {
    if (this.body.classList.contains('body_mask')) {
      this.buttonPopupMobileClose.classList.remove('header__popup-button-close_active');
    } else {
      this.buttonPopupMobileClose.classList.add('header__popup-button-close_active');
    }
  }

  removeEventListeners() {
    this.body.removeEventListener('keydown', this.closeEsc);
    this.popupButton.removeEventListener('click', this.close);
  }
}
