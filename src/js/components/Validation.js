export default class Validation {
  constructor(inputsArrError, inputErrorMessages, form, button, formButtonOpen, arr) {
    this.inputsArrError = inputsArrError;
    this._inputErrorMessages = inputErrorMessages;
    this.form = form;
    this.button = button;
    this.formButtonOpen = formButtonOpen;
    this.arr = arr;
  }

  setError = (input) => {
    const span = input.nextElementSibling;
    span.innerText = input.validationMessage;
  }

  checkValidity(item) {
    if (item.validity.patternMismatch && item.type === 'password') { //
      item.setCustomValidity(this._inputErrorMessages.parolError);
      this.setError(item);
      return false;
    }

    if (item.validity.valueMissing) { //
      item.setCustomValidity(this._inputErrorMessages.emptyInputError);
      this.setError(item);

      return false;
    }
    if (item.validity.patternMismatch && item.type === 'email') { //
      item.setCustomValidity(this._inputErrorMessages.emailError);
      this.setError(item);
      return false;
    }

    if (item.validity.tooShort || item.validity.tooLong) { //
      item.setCustomValidity(this._inputErrorMessages.inputErrorShortLong);
      this.setError(item);
      return false;
    }

    item.setCustomValidity('');
    this.setError(item);

    return true;
  }

  setEventListeners = (popUp, inputs, formProfile, switchForm) => {
    const inputsArr = Array.from(inputs);
    this.form.addEventListener('input', (event) => {
      this.button = event.currentTarget.querySelector('button');

      inputsArr.forEach((i) => {
        const item = i;
        if (event.target === item) {
          this.checkValidity(item);
        } else {
          item.textContent = '';
        }
      });

      if (inputsArr.every((item) => item.validity.valid)) {
        this.setSubmitButtonState(this.button, true);
      } else {
        this.setSubmitButtonState(this.button, false);
      }
    });

    this.formButtonOpen.addEventListener('click', () => {
      this.arr.forEach((button) => {
        this.setSubmitButtonState(button, false);
      });
      this.resetInputs(popUp, this.inputsArrError, formProfile);
    });

    switchForm.addEventListener('click', () => {
      this.arr.forEach((button) => {
        this.setSubmitButtonState(button, false);
      });
      this.resetInputs(popUp, this.inputsArrError, formProfile);
    });
  }

  resetInputs = (popUp, inputsArrError, formProfile) => {
    if (popUp.classList.contains('popup_is-opened')) {
      inputsArrError.forEach((i) => {
        const item = i;
        item.innerText = '';
        formProfile.reset();
      });
    }
  }

  setSubmitButtonState = (button, isValid) => {
    if (isValid) {
      button.removeAttribute('disabled');
      button.classList.add('popup__form-button_blue');
      button.classList.remove('popup__form-button_grey');
    } else {
      button.setAttribute('disabled', true);
      button.classList.remove('popup__form-button_blue');
      button.classList.add('popup__form-button_grey');
    }
  }
}
