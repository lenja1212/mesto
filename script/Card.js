import {openPopup} from "./script.js";

export class Card{
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
  _addLikeButton(evt){
    evt.target.classList.toggle("elements__like_active");
  }
  
  _removeCard(){
    this._element.remove();
  }

  _enlargeCard(){ //По заданию только 3 js файла, поэтому не вынес в отдельный файл, и поэтому есть циклицеская зависимость
    const cardImg = document.querySelector(".popup_format_image");
    cardImg.querySelector(".popup__image").src = this._link;
    cardImg.querySelector(".popup__image").alt = "Картинка";
    cardImg.querySelector(".popup__subtitle").textContent = this._title;
    openPopup(cardImg);
  }

  _setEventListeners() {
    this._element.querySelector(".elements__like").addEventListener("click", this._addLikeButton);

    this._element.querySelector(".elements__item_close").addEventListener("click", () =>{
      this._removeCard();
    });

    this._element.querySelector(".elements__image").addEventListener("click", () =>{
      this._enlargeCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = "Картинка";
    this._element.querySelector(".elements__title").textContent = this._title;
    return this._element;
  }
}
