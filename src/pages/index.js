import './index.css';

import {FormValidator, dataInput} from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popOpenEdit = document.querySelector(".profile__edit-button")
const popupEdit = new PopupWithForm(".popup_format_edit", handleSubmitEditCard);
const formEditElem = document.querySelector(".popup__form_format_edit");
const prName = document.querySelector(".popup__input_format_title");
const prAbout = document.querySelector(".popup__input_format_subtitle");
const popCloseEdit = document.querySelector(".popup__close_format_edit");

const prAuthor = document.querySelector(".profile__author");
const prInfo = document.querySelector(".profile__author-about")

const cardsInfo = new UserInfo({
  usernameSelector: ".profile__author",
  aboutinfoSelector:  ".profile__author-about"
});

const popOpenAdd = document.querySelector(".profile__add-button");
const popupAdd = new PopupWithForm(".popup_format_add", handleSubmitAddCard);
//popupAdd.setEventListeners;
const popCloseAdd = document.querySelector(".popup__close_format_add");
const formAddElem = document.querySelector(".popup__form_format_add");
const elTitle= document.querySelector(".popup__input_format_name");
const elImg = document.querySelector(".popup__input_format_link");
const popCloseImg = document.querySelector(".popup__close_format_img");
export const cardsGrid = document.querySelector(".elements");
const cardsListSelector = ".elements";
const formImgElem = new PopupWithImage(dataInput, ".popup_format_image");

const formEdit = new FormValidator(dataInput, formEditElem);
const formAdd = new FormValidator(dataInput, formAddElem);

const initialCards = [ 
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

const cardList = 
  new Section({
    data: initialCards, // initialCards elements
    renderer: (item) => {
      const popupWithImage = new PopupWithImage(item, ".popup_format_image");
      const cardElement = createCard(item, ".elements__template", {
        handleCardClick:() =>{
          popupWithImage.open();
        }  
      });
      cardList.addItem(cardElement);
//      cardElement.querySelector(".elements__image").addEventListener("click", () =>{
//        const popupWithImage = new PopupWithImage(item, ".popup_format_image");
//        popupWithImage.open();
//      });
    }
  },
  cardsListSelector // html selector div for cards
);



function handleSubmitEditCard(){
  cardsInfo.setUserInfo(prName, prAbout);
  popupEdit.close();
}


function createCard(data, cardSelector, func){
  const card = new Card(data, cardSelector, func);
    return card.generateCard();
}


function handleSubmitAddCard(){
  const dataAdd = 
  { 
    name: elTitle.value,
    link: elImg.value
  };
  const popupWithImage = new PopupWithImage(dataAdd, ".popup_format_image");
  const cardaddElement = createCard(dataAdd, ".elements__template", {
    handleCardClick:() =>{
      popupWithImage.open();
    }  
  });
  cardsGrid.prepend(cardaddElement);
  popupAdd.close();
}

popOpenEdit.addEventListener('click', function(){
  const {
    username,
    aboutinfo
  } = cardsInfo.getInfo();
  prName.value = username;
  prAbout.value = aboutinfo;
  popupEdit.open();
  formEdit.clearFormErrors();
});

formEditElem.addEventListener('submit', handleSubmitEditCard);

popOpenAdd.addEventListener('click', function(){
  elTitle.value = "";
  elImg.value= "";
  popupAdd.open();
  formAdd.blockButtonWhenOpen();
  formAdd.clearFormErrors();
});

popCloseImg.addEventListener('click', function(){
  formImgElem.close();
});

formEdit.enableValidation();
formAdd.enableValidation(); 

cardList.renderItems();
