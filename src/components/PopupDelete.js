import Popup from "./Popup.js";

export default class PopupDelete extends Popup{
  constructor(popupSelector, deleteCallback){
    super(popupSelector);
    this.deleteButton = this._selectedPopup.querySelector(".popup__button");
    this._callback = deleteCallback;
  }

  setEventListeners(){
    super.setEventListeners();
    this.deleteButton.addEventListener("mousedown", () =>{
      this._callback();
    })
  }

  getCard(cardToDelete){
    // console.log(cardToDelete);
    this.card = cardToDelete;
  }
}