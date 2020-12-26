/* eslint-disable no-param-reassign */
export default class RenderKeyWord {
  constructor(newsCardSaved, keyNumberSpan, blockKeyWords,
    noResultSaved, firstKey, secondKey, thirdKey) {
    this.keyNumberSpan = keyNumberSpan;
    this.blockKeyWords = blockKeyWords;
    this.noResultSaved = noResultSaved;
    this.firstKey = firstKey;
    this.secondKey = secondKey;
    this.thirdKey = thirdKey;
    this.newsCardSaved = newsCardSaved;
  }

  arrKeyWords = (arrKeyWords) => {
    const keyArrWord = [];

    arrKeyWords.forEach((item) => {
      keyArrWord.push(item.keyword);
      return keyArrWord;
    });
    const result = keyArrWord.reduce((prevVal, item) => {
      if (!prevVal[item]) {
        // если ключа ещё нет в объекте, значит это первое повторение
        prevVal[item] = 1;
      } else {
        // иначе увеличим количество повторений на 1
        prevVal[item] += 1;
      }
      // и вернём изменённый объект
      return prevVal;
    }, {});

    const numVariantsKeys = Object.keys(result);
    this.numVariantsKeysLength = numVariantsKeys.length; // колличество ключей вариантов

    // колличество вариаций ключ. слов
    // и вернём изменённый объект
    const num = Object.values(result).reduce((prevVal, item) => prevVal + item, 0);
    this.numKeys = num; // Общее изначальное колличество ключей
    this.result = result; // объект с ключевыми словами
    this.resultTrue(this.result, this.numKeys, this.numVariantsKeysLength);
  }

  resultTrue = (resultObject, numKeys, vaiants) => {
    const arr = Object.keys(resultObject);
    if (vaiants === 0) {
      this.noResult();
    } else if (vaiants === 1) {
      this.keyNumberSpan.textContent = numKeys;
      this.firstKey.classList.remove('header__saved-article-key-word-number_disabled');
      this.firstKey.textContent = `${arr[0][0].toUpperCase()}${arr[0].slice(1)}`;
      this.secondKey.textContent = '';
      this.thirdKey.textContent = '';
    } else if (vaiants === 2) {
      this.firstKey.classList.remove('header__saved-article-key-word-number_disabled');
      this.secondKey.classList.remove('header__saved-article-key-word-number_disabled');
      this.firstKey.textContent = `${arr[0][0].toUpperCase()}${arr[0].slice(1)}`;
      this.secondKey.textContent = `, ${arr[1][0].toUpperCase()}${arr[1].slice(1)}`;
      this.thirdKey.textContent = '';

      this.keyNumberSpan.textContent = numKeys;
    } else if (vaiants === 3) {
      this.firstKey.classList.remove('header__saved-article-key-word-number_disabled');
      this.secondKey.classList.remove('header__saved-article-key-word-number_disabled');
      this.thirdKey.classList.remove('header__saved-article-key-word-number_disabled');
      this.firstKey.textContent = `${arr[0][0].toUpperCase()}${arr[0].slice(1)}`;
      this.secondKey.textContent = `, ${arr[1][0].toUpperCase()}${arr[1].slice(1)}`;
      this.thirdKey.textContent = `, ${arr[2][0].toUpperCase()}${arr[2].slice(1)}`;
      this.keyNumberSpan.textContent = numKeys;
    } else if (vaiants > 3) {
      const cuontThirdspan = arr.length - 2;
      this.firstKey.classList.remove('header__saved-article-key-word-number_disabled');
      this.secondKey.classList.remove('header__saved-article-key-word-number_disabled');
      this.thirdKey.classList.remove('header__saved-article-key-word-number_disabled');

      this.firstKey.textContent = `${arr[0][0].toUpperCase()}${arr[0].slice(1)}`;
      this.secondKey.textContent = `, ${arr[1][0].toUpperCase()}${arr[1].slice(1)}`;
      this.thirdKey.textContent = `и ${cuontThirdspan} другим`;
      this.keyNumberSpan.textContent = numKeys;
    }
  }

  noResult = () => {
    this.keyNumberSpan.textContent = '0';
    this.blockKeyWords.classList.add('header__saved-article-key-word_disabled');
    this.noResultSaved.classList.remove('no-result_disabled');
    this.newsCardSaved.classList.add('news-card_disabled');
  }
}
