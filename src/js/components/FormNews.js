/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
export default class FormNews {
  constructor(newsApi, searchInput, searchButton, searchForm,
    noResultSection, loadingSection, newsCardAddButton, newsCardSection,
    newsCardGrid, apiRequest, createCardFunctionAdd, containerAdd) {
    this.newsApi = newsApi;
    this.searchInput = searchInput;
    this.searchButton = searchButton;
    this.searchForm = searchForm;
    this.noResultSection = noResultSection;
    this.loadingSection = loadingSection;
    // this.newsCardAddButton = newsCardAddButton;
    this.newsCardSection = newsCardSection;
    this.newsCardGrid = newsCardGrid;
    this.apiRequest = apiRequest;
    this.createCardFunctionAdd = createCardFunctionAdd;
    this.containerAdd = containerAdd;
  }

  setEventListenersInput() {
    this.searchForm.addEventListener('input', (event) => {
      event.preventDefault();
      const input = event.currentTarget.querySelector('.header__input');
      if (event.target === input) {
        if (input.validity.valid) {
          this.searchButton.classList.add('header__button_blue');
          this.searchButton.removeAttribute('disabled');
          this.setEventListenersNews();
        } else {
          this.searchButton.classList.remove('header__button_blue');
          this.searchButton.setAttribute('disabled', true);
          this.keyWord = input.value;
        }
      }
    });
  }

  validation = (input) => {
    if ((input.validity.patternMismatch)) {
      return false;
    }
    if ((input.validity.valueMissing)) {
      return false;
    }
    return true;
  }

  newsRequest = (event) => {
    event.preventDefault();
    this.keyword = this.searchInput.value;
    if (this.noResultSection.classList.contains('no-result_disabled')) {
      this.checknodeChildren();
      this.noResultSection.classList.add('no-result_disabled');
    }
    this.checknodeChildren();
    this.noResultSection.classList.add('no-result_disabled');
    this.loadingSection.classList.remove('loading_disabled');
    this.newsApi.getNews(this.searchInput.value)
      .then((res) => {
        this.removeAddButton();
        this.resultProcessing(res.articles);
      })
      .catch((err) => {
        alert(err); // "Что-то пошло не так: ..."
      })
      .finally(() => {
        this.loadingSection.classList.add('loading_disabled');
        this.searchForm.reset();
        this.searchButton.classList.remove('header__button_blue');
        this.searchButton.setAttribute('disabled', true);
      });
  }

resultProcessing = (arr) => {
  this.removeEventListenersNews();
  const arrLength1 = arr.length; // длина массива 8
  if (arrLength1 === 0) {
    this.noResultSection.classList.remove('no-result_disabled');
    this.newsCardSection.classList.add('news-card_disabled');
  } else if (arrLength1 > 0) {
    this.newsCardSection.classList.remove('news-card_disabled');
    if (arrLength1 <= 3) {
      this.arrProcessing(arr);
    } else if (arrLength1 > 3) {
      this.renderButton();
      this.arrThree(arr);
      this.func(arr);
    }
  }
}

 arrThree = (arr) => {
   const newArr = [];
   for (let i = 0; i < 3; i++) { // выведет 0, затем 1, затем 2
     newArr.push(arr[i]);
     if (i === 2) {
       this.arrProcessing(newArr);
     }
   }
 }

 func = (arr) => {
   let num = 3;
   let numthree = 6;
   this.newsCardAddButton = this.containerAdd.querySelector('.news-card__add-button');
   this.newsCardAddButton.addEventListener('click', (event) => {
     if (event.target.classList.contains('news-card__add-button')) {
       if (numthree < arr.length) {
         const newArr = [];
         for (; num < numthree; num++) {
           newArr.push(arr[num]);
           if (num === (numthree - 1)) {
             this.arrProcessing(newArr);
             num += 1;
             numthree += 3;
             return (num, numthree);
           }
         }
       } else if (numthree === arr.length) {
         const newArr = [];
         for (; num < numthree; num++) {
           newArr.push(arr[num]);
           if (num === (numthree - 1)) {
             this.arrProcessing(newArr);
             this.removeAddButton();
             num += 1;
             numthree += 3;
             newsCardAddButton.setAttribute('disabled', true);
             return (num, numthree);
           }
         }
       } else if (numthree > arr.length) { // 12 - 11
         const newArr = [];

         let modul = arr.length - (arr.length % 3); // 11 - 2 = 9

         for (; modul < arr.length; modul++) {
           newArr.push(arr[modul]);
           if (modul === (arr.length - 1)) {
             this.arrProcessing(newArr);
             this.removeAddButton();
             return;
           }
         }
       }
     }
   });
 }

 arrProcessing = (result) => {
   result.forEach((item) => {
     const splits = item.publishedAt.split('T');
     const dateArticle = splits[0];
     this.createCardFunctionAdd.add(this.keyword, item.title, item.description, dateArticle,
       item.source.name, item.url, item.urlToImage, this.newsCardSection,
       this.gridContainer, this.apiRequest, null, null);
   });
 }

removeAddButton = () => {
  while (this.containerAdd.firstChild) {
    this.containerAdd.removeChild(this.containerAdd.firstChild);
  }
}

setEventListenersNews = () => {
  this.searchForm.addEventListener('submit', this.newsRequest);
}

removeEventListenersNews= () => {
  this.searchForm.addEventListener('submit', this.newsRequest);
}

renderButton = () => {
  const buttonadd = document.createElement('button'); // контейнер с карточкой
  buttonadd.classList.add('button');
  buttonadd.classList.add('news-card__add-button');
  buttonadd.textContent = 'Показать еще';

  this.containerAdd.appendChild(buttonadd);
}

checknodeChildren = () => {
  const nodeChildren = this.newsCardSection.firstElementChild;
  if (nodeChildren) {
    this.newsCardGrid.textContent = '';
  }
}
}
