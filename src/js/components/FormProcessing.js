/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class FormProcessing {
  constructor(
    api,
    apiNews,
    popupInformation,
    authorizeUser,
  ) {
    this.api = api;
    this.apiNews = apiNews;
    this.popupInformation = popupInformation;
    this.authorizeUser = authorizeUser;
  }

   createUser = (event, email, password, name, span) => {
     event.preventDefault();
     this.attributeSet(email, password, name);
     this.api.signup(email.value, password.value, name.value)
       .then(() => {
         this.popupInformation.openPopUp();
       })
       .catch((err) => {
         span.textContent = err.message;
       })
       .finally(() => {
         this.attributeRemove(email, password, name);
       });
   };

   loginUser = (event, email, password, headerRender, popSignIn, popupMobileHeader, span) => {
     event.preventDefault();
     this.attributeSet(email, password);
     this.api.signin(email.value, password.value)
       .then((answer) => {
         const user = answer.name;
         const { token } = answer;
         this.authorizeUser.localStorareRecording(user, token);
         headerRender.userButtonLogIn(user);
         popupMobileHeader.closeEventHeader();
         popSignIn.closeForm();
       })
       .catch((err) => {
         span.textContent = err.message;
       })
       .finally(() => {
         this.attributeRemove(email, password);
       });
   };

   attributeSet(...inputitem) {
     inputitem.forEach((item) => {
       item.setAttribute('readonly', 'readonly');
     });
   }

   attributeRemove(...inputitem) {
     inputitem.forEach((item) => {
       item.removeAttribute('readonly', 'readonly');
     });
   }

   setEventListenersSignUp(formSignUp, inputSignupEmail, inputSignupParol,
     inputSignupName, respondSereverRegistration) {
     formSignUp.addEventListener('submit', (event) => {
       this.createUser(event, inputSignupEmail, inputSignupParol,
         inputSignupName, respondSereverRegistration);
     });
   }

   setEventListenersSignIn(formSignIn, inputSignInEmail, inputSignInParol, headerRender,
     popSignIn, popupMobileHeader, respondSereverEnter) {
     formSignIn.addEventListener('submit', (event) => {
       this.loginUser(event, inputSignInEmail, inputSignInParol,
         headerRender, popSignIn, popupMobileHeader,
         respondSereverEnter);
     });
   }
}
