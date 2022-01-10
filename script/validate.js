const showInputError = (form, formInputElement, errMessage, errorClass) => {
    const elementWithError = form.querySelector(`.${formInputElement.id}-error`)
  //  formInputElement.classList.add("popup__input_format_title-error");
    elementWithError.textContent = errMessage;
    elementWithError.classList.add(errorClass);
  };
  
  const hideInputError = (form, formInputElement, errorClass) => {
    const elementWithError = form.querySelector(`.${formInputElement.id}-error`)
  //  form.classList.remove("popup__input_format_title-error");
    elementWithError.classList.remove(errorClass);
    elementWithError.textContent = " ";
  };
  
  const isValid = (form, formInputElement, errorClass) => {
    if (!formInputElement.validity.valid) {
      showInputError(form, formInputElement, formInputElement.validationMessage, errorClass);
    } else {
      hideInputError(form, formInputElement, errorClass);
    }
  };
  
  //formEditElem.addEventListener("submit", function(evt){
   // evt.preventDefault();
  //});
  
  const setErrorListeners = function (form, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass){
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
  
  const enableValidation = function(DataInput){
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
  /*
  function removeSubmit(buttonElement){
    buttonElement.removeEventListener('submit', handleSubmitEditCard);
  }
  function addSubmit(buttonElement){
    buttonElement.removeEventListener('submit', handleSubmitEditCard);
  }
  */
  const toggleButtonState = (formInputArray, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(formInputArray)) {
      buttonElement.classList.add(inactiveButtonClass);
   //   removeSubmit(buttonElement);
      buttonElement.setAttribute('disabled', true);
  //    console.log("nonactive");
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
  //    addSubmit(buttonElement);
      buttonElement.removeAttribute('disabled');
  //    console.log("active");
    }
  }; 
  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  }); 
  