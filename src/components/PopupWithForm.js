import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._callback = submitCallback;
    this._inputList = this._selectedPopup.querySelectorAll(".popup__input");
    this._submitButton = this._selectedPopup.querySelector(".popup__button");
  }
  
  _getInputValues(){
    this._formValues = [];
    this._inputList.forEach((item) =>{
      this._formValues.push(item.value);
    });
    return this._formValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form = this._selectedPopup.querySelector(".popup__form");
    this._form.addEventListener("submit", () =>{
      this._callback();
    })
  }

  close(){
    super.close();
    this._getInputValues();
    this._form.reset();
  }
};
