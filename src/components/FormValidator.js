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
    this._form = formInputElement; //form
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.closest(this._formSelector).querySelector(this._submitButtonSelector);
  }

  _showInputError(){
  const elementWithError = this._form.closest(this._formSelector).querySelector(`.${this._inputElement.id}-error`)
    elementWithError.textContent = this._inputElement.validationMessage;
    elementWithError.classList.add(this._errorClass);
  }

  _hideInputError(){ 
    const elementWithError = this._form.closest(this._formSelector).querySelector(`.${this._inputElement.id}-error`)
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
    return  this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    
    
  }; 

  disableButton(){
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  _toggleButtonState(){
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  };

  _setErrorListeners(){
   this._inputList.forEach((inputElement) =>{
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._isValid();
        this._toggleButtonState();
      });
    });
  }

  enableValidation(){
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setErrorListeners();
  }

  clearFormErrors(){// (form, inputSelector, errorClass) =>{
    this._inputList.forEach((formInputElement) =>{
      this._inputElement = formInputElement;
      this._hideInputError();
    });
  }
}



export {FormValidator, dataInput};
