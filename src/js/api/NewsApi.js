/* eslint-disable arrow-body-style */
export default class NewsApi {
  constructor(
    URL_NEWS,
    NUMBER_ARTICLES,
    INDIVIDUAL_TOKEN,
  ) {
    this.URL_NEWS = URL_NEWS;
    this.NUMBER_ARTICLES = NUMBER_ARTICLES;
    this.INDIVIDUAL_TOKEN = INDIVIDUAL_TOKEN;
  }

  dateRequest = () => {
    const dateToday = new Date();
    const newsDateApi = `${dateToday.getFullYear()}-${dateToday.getMonth()}-${dateToday.getDate()}`;
    return newsDateApi;
  }

  getNews = (keyWord) => {
    return fetch(
      `${this.URL_NEWS}/v2/everything?q=${keyWord}&from=${this.dateRequest}&pageSize=${this.NUMBER_ARTICLES}&apiKey=${this.INDIVIDUAL_TOKEN}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        return result;
      });
  }
}
