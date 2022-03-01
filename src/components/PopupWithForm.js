import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._callback = submitCallback;
    this._inputList = this._selectedPopup.querySelectorAll(".popup__input");
    this.submitButton = this._selectedPopup.querySelector(".popup__button");
  }
  
  _getInputValues(){
    this.formValues = {};
    this._inputList.forEach((input) =>{
      this.formValues[input.name] = input.value;
    });
    // console.log(this.formValues);
    return this.formValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form = this._selectedPopup.querySelector(".popup__form");
    this._form.addEventListener("submit", () =>{
      this.submitButton.textContent = "Cохранение...";
      this._callback(this._getInputValues());  
    })
  }

  close(){
    super.close();
    this._form.reset();
  }
};
