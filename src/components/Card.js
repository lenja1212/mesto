//import  {popButtonDelete} from "../utils/constants.js"

import {api} from "../components/Api.js";

export default class Card{
  constructor(data, cardSelector, {handleCardClick, handleDeleteCard} ){
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
    this._likeAmountElement = this._element.querySelector(".elements__like-amount");
    this._likesAmount = data.likes.length;
    this._id = data._id;
    this.removeCard = this.removeCard.bind(this);
    // console.log(data);
    // console.log(data._id)


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
    if(evt.target.classList.contains("elements__like_active")){
      this._likesAmount -= 1;
      //Server
      api.deleteLike(this._id)
      .catch((err) => { 
        console.log(`Ошибка. Запрос не выполнен ${err}`); 
      }); 
    }
    else{
      this._likesAmount += 1;
      api.addLike(this._id)
      .catch((err) => { 
        console.log(`Ошибка. Запрос не выполнен ${err}`); 
      }); 
    }
    evt.target.classList.toggle("elements__like_active");
    const likesElement = evt.target.closest(".elements__like-container").querySelector(".elements__like-amount");
    likesElement.textContent = this._likesAmount;
  }

  
  removeCard(){
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".elements__like");
    this._likeButton.addEventListener("mousedown", (evt) =>{
      this._addLikeButton(evt);
    });
    if(this._element.firstElementChild.classList.contains("elements__item_close")){
      this._element.querySelector(".elements__item_close").addEventListener("click", () =>{
        this._handleDeleteCard();
      });
    }  
    this._cardImage.addEventListener("click", () =>{
      this._handleClick();
    });
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title + ".";
    this._likeAmountElement.textContent = this._likesAmount;
    this._element.querySelector(".elements__title").textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}
