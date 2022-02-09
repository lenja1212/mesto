import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._callback = submitCallback;
  }
  
  _getInputValues(){
    this._inputList = this._selectedPopup.querySelectorAll(".poput__input")
    this._title = this._inputList[0];
    this._subtitle = this._inputList[1];
  }

  setEventListeners(){
    super.setEventListeners();
    const submitButton = this._selectedPopup.querySelector(".popup__button");
    submitButton.addEventListener("click", () =>{
      this._callback();
    })
  }

  close(){
    super.close();
    this._getInputValues();
    if(this._selectedPopup.classList.contains("popup_format_add")){
      this._title = "";
      this._subtitle = "";
    }
  }
};