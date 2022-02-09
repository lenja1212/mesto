import Popup from "./Popup.js";
//import  Card  from "./Card.js";

export default class PopupWithImage extends Popup{
  constructor(data, popupSelector){
    super(popupSelector);
    this._title = data.name;
    this._link = data.link;
  }

  open(){
    const cardImg = this._selectedPopup;
    cardImg.querySelector(".popup__image").src = this._link;
    cardImg.querySelector(".popup__image").alt = "Картинка";
    cardImg.querySelector(".popup__subtitle").textContent = this._title;
    super.open();
  }
}