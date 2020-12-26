export default class Form {
  constructor(
    inputsArr,
    validator,
    template,
    buttonPopUp,
    buttonArr,

    popUp,
    inputs,
    formButtonOpen,
    inputErrorMessages,
    switchForm,
  ) {
    this.inputsArr = inputsArr;
    this.Validator = validator;
    this.template = template; //
    this.button = buttonPopUp; //
    this.Arr = buttonArr; //
    this.popUp = popUp;//
    this.inputs = inputs;//
    this.formButtonOpen = formButtonOpen;
    this.inputErrorMessages = inputErrorMessages;
    this.switchForm = switchForm;
  }

  render() {
    this.view = this.template;
    const validator = new this.Validator(this.inputsArr, this.inputErrorMessages,
      this.view, this.button, this.formButtonOpen, this.Arr);
    validator.setEventListeners(
      this.popUp,
      this.inputs,
      this.view,
      this.switchForm,
    );
  }
}
