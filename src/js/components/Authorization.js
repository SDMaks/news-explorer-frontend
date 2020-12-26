/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-extra-semi */
export default class Authorization {
  constructor(
    api,
    menuButton,
    headerRender,
  ) {
    this.api = api;
    this.menuButton = menuButton;
    this.headerRender = headerRender;
  }

  authorizationUser = () => {
    this.api.getUser()
      .then((answer) => {
        this.localStorareRecording(answer.name, answer);
        this.setEventlisenerUser();
      })
      .catch((err) => {
        alert(err); // "Что-то пошло не так: ..."
      });
  };

  authorizationUserLogOut = (event) => {
    if (event.currentTarget.classList.contains('menu__button')) {
      const result = window.confirm(
        'Вы действительно хотите выйти?',
      );
      if (result) {
        this.api.logOutUser()
          .then(() => {
            this.localStorareClear();
            this.headerRender.headerRenderLogOut();
            window.location.href = './';
            this.removeEventlisenerUser();
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
  };

  localStorareRecording(name, token) {
    window.localStorage.setItem(name, token);
    window.localStorage.setItem('user', name);
  };

  localStorareClear() {
    window.localStorage.clear();
  };

  userNameNews(userName) {
    const user = window.localStorage.getItem('user');
    this.headerRender.userNameNews(user);
    userName.textContent = user;
  }

  setEventlisenerUser() {
    this.menuButton.addEventListener('click', () => this.authorizationUserLogOut(event));
  };

  removeEventlisenerUser() {
    this.menuButton.removeEventListener('click', this.authorizationUserLogOut);
  };
}
