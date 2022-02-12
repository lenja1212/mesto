export default class Card{
  constructor(data, cardSelector, {handleCardClick}){
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
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

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".elements__like");
    this._element.querySelector(".elements__like").addEventListener("click", this._addLikeButton);
    this._element.querySelector(".elements__item_close").addEventListener("click", () =>{
      this._removeCard();
    });
    ////popupwithimg open
    this._cardImage.addEventListener("click", () =>{
      this._handleClick();
    });
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title + ".";
    this._element.querySelector(".elements__title").textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}
