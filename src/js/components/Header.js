/* eslint-disable no-undef */
export default class Header {
  constructor(liSaveArticles, liAutorization, liLogOut, menuButtonSpan, api, bodyMain) {
    this.liSaveArticles = liSaveArticles;
    this.liAutorization = liAutorization;
    this.liLogOut = liLogOut;
    this.menuButtonSpan = menuButtonSpan;
    this.api = api;
    this.bodyMain = bodyMain;
  }

  headerRenderLogIn() {
    this.liSaveArticles.classList.remove('log-out');
    this.liAutorization.classList.add('log-out');
    this.liLogOut.classList.remove('log-out');
  }

  headerRenderLogOut() {
    if (this.bodyMain.id === 'main-page') {
      this.liSaveArticles.classList.add('log-out');
      this.liAutorization.classList.remove('log-out');
      this.liLogOut.classList.add('log-out');
      this.userButtonLogOut();
    } else if (this.bodyMain.id === 'save-news') {
      this.userButtonLogOut();
      window.location.href = './';
    }
  }

  userButtonLogIn = (user) => {
    this.menuButtonSpan.textContent = user;
    this.headerRenderLogIn();
  }

  userButtonLogOut = () => {
    this.menuButtonSpan.textContent = '';
  }

  userNameNews = (user) => {
    this.menuButtonSpan.textContent = user;
  }
}
