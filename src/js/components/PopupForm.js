import Popup from './Popup';

export default class PopupForm extends Popup {
  constructor(serverMessage, buttonPopupMobileClose, popUp, popupButton,
    body, popUpNext, form, addButton, popUpNextButton) {
    super(serverMessage, buttonPopupMobileClose, popUp, popupButton, body, popUpNext, form);
    this.addButton = addButton;
    this.popUpNextButton = popUpNextButton;
  }

  setEventListeners() {
    this.addButton.addEventListener('click', () => {
      super.openEvent();
      super.formOpen();
      this.removeEventListeners();
    });
  }

  setEventListenersNext() {
    this.popUpNextButton.addEventListener('click', () => {
      super.openCloseEventNext();
      this.closeForm();

      this.removeEventListeners();
    });
  }

  closeForm() {
    super.closeNext();
  }

  removeEventListeners() {
    this.addButton.removeEventListener('click', super.openEvent);
  }
}
