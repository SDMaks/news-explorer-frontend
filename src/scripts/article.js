/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import '../pages/article.css';
import Authorization from '../js/components/Authorization';
import Header from '../js/components/Header';
import PopupMobile from '../js/components/PopupMobile';
import Api from '../js/api/MainApi';
import RenderKeyWord from '../js/components/RenderKeyWord'; //
import CardList from '../js/components/CardList';
import Card from '../js/components/Card';
import { configurl } from '../js/configfile/configfile';

import {
  body,
  liSaveArticles,
  liAutorization,
  liMenuButtonSpan,
  menuButtonNews,
  liLogOutNews,
  buttonPopupMobile,
  buttonPopupMobileClose,
  mobilePopupMask,
  menuMobile,
  menuButtonLogoOut,
  headerUser,
  keyNumberSpan, //
  blockKeyWords, //
  noResultSaved, //
  firstKey,
  secondKey,
  thirdKey,
  savedGrid,
  newsCardSaved,
} from '../js/constants/constantsNews';

!(function () {
  const apiRequest = new Api(configurl.url);

  const headerRender = new Header(
    liSaveArticles, liAutorization, liLogOutNews, liMenuButtonSpan, Api, body,
  );

  const authorizeUser = new Authorization(apiRequest, menuButtonNews, headerRender);

  authorizeUser.userNameNews(headerUser);

  function renderSpanWords() {
    getSaveArticles('delEvent');
  }

  const keyWordRender = new RenderKeyWord(newsCardSaved, keyNumberSpan,
    blockKeyWords, noResultSaved, firstKey, secondKey, thirdKey);

  const popupMobileHeader = new PopupMobile(
    buttonPopupMobile, buttonPopupMobileClose, body, mobilePopupMask, menuMobile, menuButtonLogoOut,
  );
  popupMobileHeader.renderButton();
  popupMobileHeader.setEventListeners();
  popupMobileHeader.renderButtonClose();

  authorizeUser.setEventlisenerUser();

  const createCardFunction = (
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
  ) => new Card(keyword, title, text, date, source, link, image,
    section, gridContainer, api, idCard, renderfunction);

  const createCardFunctionAdd = new CardList(apiRequest, createCardFunction, savedGrid);

  function getSaveArticles(delEvent) {
    apiRequest.getArticles()
      .then((result) => {
        if (!delEvent) {
          keyWordRender.arrKeyWords(result.data);
          result.data.forEach((item) => {
            const kewordItem = item.keyword[0].toUpperCase() + item.keyword.slice(1);

            createCardFunctionAdd.add(kewordItem, item.title, item.text, item.date,
              item.source, item.link, item.image, newsCardSaved, savedGrid,
              apiRequest, item._id, renderSpanWords);
          });
        } else if (delEvent) {
          keyWordRender.arrKeyWords(result.data);
        }
      })
      .catch((err) => {
        if (err.message === 'Нет статей в базе') {
          keyWordRender.noResult();
        } else if (err.message !== 'Нет статей в базе') {
          alert(err.message);
        }
      });
  }
  getSaveArticles();
}());
