import {addLikeButton, cardsGrid, removeCard, enlargeCard} from "./script.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

class Card{
  constructor(data, cardSelector){
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }
  
  _setEventListeners() {
    this._element.querySelector(".elements__like").addEventListener("click", addLikeButton);

    this._element.querySelector(".elements__item_close").addEventListener("click", () =>{
      removeCard(this._element);
    });

    this._element.querySelector(".elements__image").addEventListener("click", () =>{
      enlargeCard(this._title, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__title").textContent = this._title;  
    return this._element;
  }
}

function renderElements(){
//  cardsGrid.innerHTML = '';
  initialCards.forEach((item) => {
    let card;
    card = new Card(item, ".elements__template");
//    console.log(card);
    const cardElement = card.generateCard();
    cardsGrid.append(cardElement);
  });
}

renderElements();