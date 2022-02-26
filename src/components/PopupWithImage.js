import Popup from "./Popup.js";
//import  Card  from "./Card.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._cardImge = this._selectedPopup.querySelector(".popup__image");
    this._cardSubtitle = this._selectedPopup.querySelector(".popup__subtitle");
  }

  open(data){
    this._cardImge.src = data.link;
    this._cardImge.alt = data.name + ".";
    this._cardSubtitle.textContent = data.name;
    super.open();
  }
}