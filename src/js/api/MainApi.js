/* eslint-disable arrow-body-style */
export default class MainApi {
  constructor(
    url,
  ) {
    this.url = url;
  }

  apiRespond = (res) => {
    if (res.ok) {
      const answer = res.json();
      return answer;
    }
    const json = res.json();
    return json.then(Promise.reject.bind(Promise));
  };

  signup = (email, password, name) => {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => this.apiRespond(res));
  };

  signin = (email, password) => {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this.apiRespond(res));
  };

  getUser = () => {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this.apiRespond(res));
  };

  logOutUser = () => {
    return fetch(`${this.url}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this.apiRespond(res));
  }

  createArticle = (keywordCard, titleCard, textCard,
    dateCard, sourceCard, linkCard, imageCard) => {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keywordCard,
        title: titleCard,
        text: textCard,
        date: dateCard,
        source: sourceCard,
        link: linkCard,
        image: imageCard,
      }),
    }).then((res) => this.apiRespond(res));
  }

  deleteArticle = (idCard) => {
    return fetch(`${this.url}/articles/${idCard}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this.apiRespond(res));
  }

  getArticles = () => {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this.apiRespond(res));
  }
}
