/* eslint-disable no-alert */
/* eslint-disable no-undef */
export default class Card {
  constructor(keyword, title, text, date, source, link, image,
    section, gridContainer, api, idCard, renderfunction) {
    this.keyword = keyword;
    this.title = title; //
    this.text = text; //
    this.date = date; //
    this.source = source;
    this.link = link; //
    this.image = image; //
    this.section = section;
    this.gridContainer = gridContainer;
    this.api = api;
    this.idCard = idCard;
    this.renderfunction = renderfunction;
    this.imageValueError = './images/test_1.png';
    this.messageToLogIn = 'Войдите, чтобы сохранять статьи';
    this.idCard = idCard;
  }

  create = () => {
    const placeCard = document.createElement('div'); // контейнер с карточкой
    placeCard.classList.add('card'); // контейнеру присваиваем класс

    const cardArticleContainer = document.createElement('a'); // контейнер с текстами
    cardArticleContainer.classList.add('card__article-container');
    cardArticleContainer.setAttribute('target', '_blank');
    cardArticleContainer.setAttribute('href', `${this.link}`);

    const image = document.createElement('img'); //
    image.classList.add('card__image');
    image.setAttribute('alt', 'картинка к статье');
    image.setAttribute('onerror', `this.onerror=null;this.src='${this.imageValueError}';`);
    image.setAttribute('src', `${this.image}`);

    const cardButtonContainer = document.createElement('div'); // контейнер с кнопками
    cardButtonContainer.classList.add('card__button-container');
    if (this.section.id === 'news-card-saved') {
      cardButtonContainer.classList.add('card__button-container_position');
    } else if (this.section.id === 'news-card') {
      cardButtonContainer.classList.add('card__button-container_position-main');
    }

    const cardArticleDate = document.createElement('p'); //
    cardArticleDate.classList.add('card__article-date');
    cardArticleDate.textContent = this.date;

    const cardArticleTitle = document.createElement('h2'); //
    cardArticleTitle.classList.add('card__article-title');
    cardArticleTitle.textContent = this.title;

    const cardArticleText = document.createElement('p'); //
    cardArticleText.classList.add('card__article-text');
    cardArticleText.textContent = this.text;

    const cardArticleUrl = document.createElement('p'); //
    cardArticleUrl.classList.add('card__article-url');
    cardArticleUrl.textContent = this.source;

    cardArticleContainer.appendChild(cardArticleDate);
    cardArticleContainer.appendChild(cardArticleTitle);
    cardArticleContainer.appendChild(cardArticleText);
    cardArticleContainer.appendChild(cardArticleUrl);

    const cardButtonInfo = document.createElement('span');
    if (this.section.id === 'news-card') {
      cardButtonInfo.classList.add('card__button-info_disactive');
      cardButtonInfo.classList.add('card__button-info');
      cardButtonInfo.textContent = this.messageToLogIn;
    } else if (this.section.id === 'news-card-saved') {
      cardButtonInfo.classList.add('card__button-info-card');
      cardButtonInfo.textContent = this.keyword;
    }

    const cardButtonIcon = document.createElement('button');
    if (this.section.id === 'news-card') {
      cardButtonIcon.classList.add('card__button-icon');
      cardButtonIcon.classList.add('card__button-icon_grey');
      cardButtonIcon.classList.add('card__button-icon_greyq');
    } else if (this.section.id === 'news-card-saved') {
      cardButtonIcon.classList.add('card__button-icon-delete');
      cardButtonIcon.id = this.idCard;
    }

    cardButtonContainer.appendChild(cardButtonInfo);
    cardButtonContainer.appendChild(cardButtonIcon);

    placeCard.appendChild(cardButtonContainer);
    placeCard.appendChild(image);
    placeCard.appendChild(cardArticleContainer);

    this._view = placeCard;
    this.cardButtonIcon = cardButtonIcon;
    this.linkCard = cardArticleContainer.getAttribute('href');
    this.imageCard = image.getAttribute('src');
    this.dateCard = cardArticleDate.textContent;
    this.titleCard = cardArticleTitle.textContent;
    this.textCard = cardArticleText.textContent;
    this.sourceCard = cardArticleUrl.textContent;
    this.keywordCard = this.keyword;

    this.cardButtonIconCard = cardButtonIcon;
    this.cardButtonInfoCard = cardButtonInfo; //
    this.setEventListeners();
    return this._view;
  };

  setEventListeners() {
    if (this.section.id === 'news-card-saved') {
      this.buttonDeleteSave = this._view.querySelector('.card__button-icon-delete');
      this.buttonDeleteSave.addEventListener('click', this.deleteCardeSaved);
    } else if (this.section.id === 'news-card') {
      this._view
        .querySelector('.card__button-icon_grey')
        .addEventListener('click', this.save);
      this._view
        .querySelector('.card__button-icon_greyq')
        .addEventListener('mouseover', this.setEventListenersInfo);
      this._view
        .querySelector('.card__button-icon_greyq')
        .addEventListener('mouseout', this.setEventListenersInfoRemoove);
    }
  }

  deleteCardeSaved = (event) => {
    if (event.target.className === 'card__button-icon-delete') {
      this.api.deleteArticle(this.buttonDeleteSave.id)
        .then(() => {
          event.target.closest('.card').remove();
          this.renderfunction();
        })
        .catch((err) => {
          alert(err); // "Что-то пошло не так: ..."
        });
    }
  }

save = () => {
  const user = window.localStorage.getItem('user');
  if ((user)) {
    this.disactiveDeleteButton = this._view.querySelector('.card__button-icon_grey');
    this.button = this._view.querySelector('.card__button-icon');
    this.disactiveInfo = this._view.querySelector('.card__button-info_disactive');
    this.api.createArticle(this.keywordCard, this.titleCard, this.textCard,
      this.dateCard, this.sourceCard, this.linkCard, this.imageCard)
      .then((result) => {
        this.button.id = result.data._id;
        this.button.classList.add('card__button-icon_blue');
        this._view.querySelector('.card__button-icon_grey').removeEventListener('click', this.save);
        this.button.classList.remove('card__button-icon_grey');
        this.buttonDelete = this._view.querySelector('.card__button-icon_blue');
        return this.buttonDelete;
      })
      .then((buttonDelete) => {
        this.deleteCardEventListener(buttonDelete);
      })
      .catch((err) => {
        alert(err); // "Что-то пошло не так: ..."
      });
  }
}

deleteCardEventListener = (buttonDelete) => {
  buttonDelete.addEventListener('click', this.deleteCard);
}

deleteCard = () => {
  this.buttonDelete.removeEventListener('click', this.deleteCard);
  this.api.deleteArticle(this.buttonDelete.id)
    .then(() => {
      this.buttonDelete.classList.remove('card__button-icon_blue');
      this.buttonDelete.removeAttribute('id');
      this._view.querySelector('.card__button-icon').classList.add('card__button-icon_grey');

      this.setEventListeners();
    })
    .catch((err) => {
      alert(err); // "Что-то пошло не так: ..."
    });
}

 setEventListenersInfo = (event) => {
   const user = window.localStorage.getItem('user');
   if (!user && (event.target.classList.contains('card__button-icon_greyq'))) {
     const disactiveInfo = this._view.querySelector('.card__button-info');
     disactiveInfo.classList.remove('card__button-info_disactive');
     //   this.remove();
   }
 }

 setEventListenersInfoRemoove = (event) => {
   const user = window.localStorage.getItem('user');
   if (!user && (event.target.classList.contains('card__button-icon_greyq'))) {
     const disactiveInfo = this._view.querySelector('.card__button-info');
     disactiveInfo.classList.add('card__button-info_disactive');
     //    this.remove();
   }
 }

 remove = () => {
   this._view
     .querySelector('.card__button-icon_greyq')
     .removeEventListener('mouseover', this.setEventListenersInfo);
   this._view
     .querySelector('.card__button-icon_greyq')
     .removeEventListener('mouseout', this.setEventListenersInfo);
 }
}
