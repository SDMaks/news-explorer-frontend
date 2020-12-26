export default class CardList {
  constructor(api, createCardFunction, newsCardGrid) {
    this.api = api;
    this._createCardFunction = createCardFunction;
    this.newsCardGrid = newsCardGrid;
  }

  add = (keyword, title, text, date, source, link, image,
    section, gridContainer, api, idCard, renderfunction) => {
    this.card = this._createCardFunction(
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      section,
      gridContainer,
      api,
      idCard,
      renderfunction,
    ).create();
    this.newsCardGrid.appendChild(this.card);
  };
}
