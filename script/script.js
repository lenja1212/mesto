import{FormValidator, dataInput} from "./FormValidator.js";
import{Card} from "./Card.js";
import {openPopup, closePopup} from "./utils.js";

const popOpenEdit = document.querySelector(".profile__edit-button")
const popupEdit = document.querySelector(".popup_format_edit");
const formEditElem = document.querySelector(".popup__form_format_edit");
const prName = document.querySelector(".popup__input_format_title");
const prAbout = document.querySelector(".popup__input_format_subtitle");
const popCloseEdit = document.querySelector(".popup__close_format_edit");

const prAuthor = document.querySelector(".profile__author");
const prInfo = document.querySelector(".profile__author-about")

const popOpenAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_format_add");
const popCloseAdd = document.querySelector(".popup__close_format_add");
const formAddElem = document.querySelector(".popup__form_format_add");
const elTitle= document.querySelector(".popup__input_format_name");
const elImg = document.querySelector(".popup__input_format_link");
const popCloseImg = document.querySelector(".popup__close_format_img");
export const cardsGrid = document.querySelector(".elements");
const formImgElem = document.querySelector(".popup_format_image");
const buttonSubmitAdd= document.querySelector(".popup__button-submit-add");


//const tempElems = document.querySelector(".elements__template").content;

const formsArray = Array.from(document.querySelectorAll(dataInput.formSelector));
//console.log(formsArray);
const formEdit = new FormValidator(dataInput, formEditElem);
const formAdd = new FormValidator(dataInput, formAddElem);

const initialCards = [ // Вынес сюда, так как, см Card.js стр. 25
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function handleSubmitEditCard(evt){
  evt.preventDefault();
  prAuthor.textContent = prName.value;
  prInfo.textContent = prAbout.value;
  closePopup(popupEdit);
}


function createCard(data, cardSelector){
  const card = new Card(data, cardSelector);
    return card.generateCard();
}


function handleSubmitAddCard(evt){
  evt.preventDefault();
  const dataAdd = 
 { 
    name: elTitle.value,
    link: elImg.value
 };
  cardsGrid.prepend(createCard(dataAdd, ".elements__template"));
  closePopup(popupAdd);
}

////////////////////////////////////////


function renderElements(){
  initialCards.forEach((item) => {
    const cardElement = createCard(item, ".elements__template");
    cardsGrid.append(cardElement);
  });
}

popCloseEdit.addEventListener('click', function(){
  closePopup(popupEdit);
  formEdit.clearFormErrors();
});

popOpenEdit.addEventListener('click', function(){
  prName.value = prAuthor.textContent;
  prAbout.value = prInfo.textContent;
  openPopup(popupEdit);
  formEdit.clearFormErrors();
});

formEditElem.addEventListener('submit', handleSubmitEditCard);

popOpenAdd.addEventListener('click', function(){
  elTitle.value = "";
  elImg.value= "";
  openPopup(popupAdd);
  formAdd.blockButtonWhenOpen();
  formAdd.clearFormErrors();
});

popCloseAdd.addEventListener('click', function(){
  closePopup(popupAdd);
  formAdd.clearFormErrors();
});

popCloseImg.addEventListener('click', function(){
  closePopup(formImgElem);
});

formAddElem.addEventListener('submit', handleSubmitAddCard);

renderElements();

formEdit.enableValidation();
formAdd.enableValidation(); 


