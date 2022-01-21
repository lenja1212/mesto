const dataInput = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
};

class FormValidator{
  constructor(dataInput, formInputElement){
    this._formSelector = dataInput.formSelector;
    this._inputSelector = dataInput.inputSelector;
    this._submitButtonSelector = dataInput.submitButtonSelector;
    this._inactiveButtonClass = dataInput.inactiveButtonClass;
    this._inputErrorClass = dataInput.inputErrorClass;
    this._errorClass = dataInput.errorClass;
    this._formInputElement = formInputElement; //form
  }

  _showInputError(){
  const elementWithError = this._formInputElement.closest(this._formSelector).querySelector(`.${this._inputElement.id}-error`)
    elementWithError.textContent = this._inputElement.validationMessage;
    elementWithError.classList.add(this._errorClass);
  }

  _hideInputError(){ 
    const elementWithError = this._formInputElement.closest(this._formSelector).querySelector(`.${this._inputElement.id}-error`)
    elementWithError.classList.remove(this._errorClass);
    elementWithError.textContent = " ";
  }

  _isValid(){
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _hasInvalidInput(){
    return  this._formInputArray.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    
    
  }; 

  blockButtonWhenOpen(){
    this._formInputElement.closest(this._formSelector).querySelector(this._submitButtonSelector).setAttribute('disabled', true);
    this._formInputElement.closest(this._formSelector).querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
  };

  _toggleButtonState(){
    if (this._hasInvalidInput()) {
      this.blockButtonWhenOpen();
    } else {
      this._formInputElement.closest(this._formSelector).querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
      this._formInputElement.closest(this._formSelector).querySelector(this._submitButtonSelector).removeAttribute('disabled');
    }
  };

  _setErrorListeners(){
    this._formInputArray = Array.from(this._formInputElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formInputElement.querySelector(this._submitButtonSelector);
    this._formInputArray.forEach((inputElement) =>{
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._isValid();
        this._toggleButtonState();
      });
    });
  }

  enableValidation(){
    this._form = this._formInputElement;
  //  console.log(this._form);
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setErrorListeners();
  }

  clearFormErrors(){// (form, inputSelector, errorClass) =>{
    this._form = this._formInputElement;
//    console.log(this._formInputElement)
    const formInputArray = Array.from(this._form.querySelectorAll(this._inputSelector));
//    console.log(formInputArray);
    formInputArray.forEach((formInputElement) =>{
      this._inputElement = formInputElement;
      this._hideInputError();
    });
  }
}



export {FormValidator, dataInput};
/*
const blockButtonWhenOpen = (buttonElement, inactiveButtonClass) =>{
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(inactiveButtonClass);
};

const hideInputError = (form, formInputElement, errorClass) => {
  const elementWithError = form.querySelector(`.${formInputElement.id}-error`)
  elementWithError.classList.remove(errorClass);
  elementWithError.textContent = " ";
};

const clearFormErrors = (form, inputSelector, errorClass) =>{
  const formInputArray = Array.from(form.querySelectorAll(inputSelector));
  formInputArray.forEach((formInputElement) =>{
    hideInputError(form, formInputElement, errorClass);
  });
}
*/