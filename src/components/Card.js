export default class Card{
  constructor(data, cardSelector, {handleCardClick, handleDeleteCard, handleAddLike, handleDeleteLike} ){
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
    this._handleSetLike = handleAddLike;
    this._handleResetLike = handleDeleteLike;
    this._likeButton = this._element.querySelector(".elements__like");
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
      //Server
      this._handleResetLike(this._id)
    }
    else{
      this._handleSetLike(this._id)
    }
  }

  setLikeActive(){
    this._likeButton.classList.add("elements__like_active");
  }

  setLikesAmount(likesAmount){
    this._likeButton.classList.toggle("elements__like_active");
    const likesElement = this._likeButton.closest(".elements__like-container").querySelector(".elements__like-amount");
    likesElement.textContent = likesAmount;
  }
  
  removeCard(){
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
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
