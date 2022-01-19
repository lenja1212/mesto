const DataInput = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
};

class FormValidator{
  constructor(DataInput, formInputElement){
    this._formSelector = DataInput.formSelector;
    this._inputSelector = DataInput.inputSelector;
    this._submitButtonSelector = DataInput.submitButtonSelector;
    this._inactiveButtonClass = DataInput.inactiveButtonClass;
    this._inputErrorClass = DataInput.inputErrorClass;
    this._errorClass = DataInput.errorClass;
    this._formInputElement = formInputElement; //form
  }

  _showInputError(){
  //  console.log(this._formSelector);// Нужна выбирать ошибку из _формы_
  const elementWithError = this._formInputElement.closest(this._formSelector).querySelector(`.${this._InputElement.id}-error`)
  //  formInputElement.classList.add("popup__input_format_title-error");
  //  console.log(this._InputElement.validationMessage);
    elementWithError.textContent = this._InputElement.validationMessage;
    elementWithError.classList.add(this._errorClass);
  }

  _hideInputError(){ //(form, formInputElement, errorClass) => {
  //  console.log(this._formInputElement);
    const elementWithError = this._formInputElement.closest(this._formSelector).querySelector(`.${this._InputElement.id}-error`)
  //  console.log(this._InputElement.id);
  //  console.log(elementWithError);
    elementWithError.classList.remove(this._errorClass);
    elementWithError.textContent = " ";
  }

  _isValid(){
   // console.log(this._InputElement);
    if (!this._InputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _hasInvalidInput(){//(formInputArray) => {
  //  console.log(this._formInputArray);
    return  this._formInputArray.some((inputElement) => {
    //  console.log(inputElement);
      return !inputElement.validity.valid;
    });
    
    
  }; 

  _blockButtonWhenOpen(){// = (buttonElement, inactiveButtonClass) =>{
    this._formInputElement.closest(this._formSelector).querySelector(this._submitButtonSelector).setAttribute('disabled', true);
    this._formInputElement.closest(this._formSelector).querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
  };

  _toggleButtonState(){// (formInputArray, buttonElement, inactiveButtonClass) => {
    if (this._hasInvalidInput()) {
      this._blockButtonWhenOpen();
    } else {
    //  console.log(this._submitButtonSelector);
      this._formInputElement.closest(this._formSelector).querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
      this._formInputElement.closest(this._formSelector).querySelector(this._submitButtonSelector).removeAttribute('disabled');
    }
  };

  _setErrorListeners(){// = (form, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass) =>{
    const formInputArray = Array.from(this._formInputElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formInputElement.querySelector(this._submitButtonSelector);
  //  toggleButtonState(formInputArray, buttonElement);
    this._formInputArray = formInputArray;
  //  console.log(formInputArray);
    formInputArray.forEach((InputElement) =>{
    //  console.log(InputElement);
      InputElement.addEventListener('input', () => {
        this._InputElement = InputElement;
    //    console.log(this._InputElement);
        this._isValid();//form, InputElement, errorClass);
        this._toggleButtonState();//(formInputArray, buttonElement, inactiveButtonClass);
      });
    });
  }

  enableValidation(){// = (DataInput) => {
  //  const formsArray = Array.from(document.querySelectorAll(DataInput.formSelector));
    const FormForValidation = document.querySelector(this._formSelector);
    FormForValidation.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setErrorListeners();
  }
}

function renderValidation(){
  const formsArray = Array.from(document.querySelectorAll(DataInput.formSelector));
  formsArray.forEach(function (formArrayElement) {
  //    console.log(formArrayElement);
      let FormValid = new FormValidator(DataInput, formArrayElement);
      FormValid.enableValidation();
    });
}

renderValidation();


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

export {blockButtonWhenOpen, DataInput, clearFormErrors};

/*
const showInputError = (form, formInputElement, errMessage, errorClass) => {
  const elementWithError = form.querySelector(`.${formInputElement.id}-error`)
//  formInputElement.classList.add("popup__input_format_title-error");
  elementWithError.textContent = errMessage;
  elementWithError.classList.add(errorClass);
};

const hideInputError = (form, formInputElement, errorClass) => {
  const elementWithError = form.querySelector(`.${formInputElement.id}-error`)
  elementWithError.classList.remove(errorClass);
  elementWithError.textContent = " ";
};
 
const isValid = (form, formInputElement, errorClass) => {
//  console.log(formInputElement.validity.valid);
//  console.log(formInputElement);
  if (!formInputElement.validity.valid) {
    showInputError(form, formInputElement, formInputElement.validationMessage, errorClass);
  } else {
    hideInputError(form, formInputElement, errorClass);
  }
};
  
const setErrorListeners = (form, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass) =>{
  const formInputArray = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);
//  toggleButtonState(formInputArray, buttonElement);
  formInputArray.forEach(function (formInputElement) {
    formInputElement.addEventListener('input', () => {
      isValid(form, formInputElement, errorClass);
      toggleButtonState(formInputArray, buttonElement, inactiveButtonClass);
    });
  });
}
  
const enableValidation = (DataInput) => {
  const formsArray = Array.from(document.querySelectorAll(DataInput.formSelector));
  formsArray.forEach(function (formArrayElement) {
    formArrayElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setErrorListeners(formArrayElement, DataInput.inputSelector, DataInput.submitButtonSelector, DataInput.inactiveButtonClass, DataInput.errorClass);
  });
}
  
const hasInvalidInput = (formInputArray) => {
  return formInputArray.some((inputElement) => {
//    console.log(inputElement.validity);
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (formInputArray, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(formInputArray)) {
    blockButtonWhenOpen(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const blockButtonWhenOpen = (buttonElement, inactiveButtonClass) =>{
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(inactiveButtonClass);
};


enableValidation(DataInput); 
*/
