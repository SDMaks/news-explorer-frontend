import Popup from './Popup';

export default class PopupInfoSuccess extends Popup {
  constructor(
    serverMessage, buttonPopupMobileClose, popUp, popupButton, body, popUpNext, form,
    buttonSwitchFromSuccessInfo, signUpPopUp,
  ) {
    super(serverMessage, buttonPopupMobileClose, popUp, popupButton, body, popUpNext, form);
    // this.addButton = addButton;
    this.buttonSwitchFromSuccessInfo = buttonSwitchFromSuccessInfo;
    this.signUpPopUp = signUpPopUp;
  }

  openPopUp() {
    super.openEvent();
    this.registrationClose();
    // super.openCloseEventNext();
    this.setEventListeners();
  }

  setEventListeners() {
    this.buttonSwitchFromSuccessInfo.addEventListener('click', () => {
      super.openCloseEventNext();
      super.openEvent();
    // this.removeEventListeners();
    });
  }

  registrationClose() {
    this.signUpPopUp.classList.remove('popup_is-opened');
  }

  //

/*  removeEventListeners() {
    this.addButton.removeEventListener('click', super.openEvent);
  } */
}
