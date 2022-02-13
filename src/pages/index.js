import './index.css';

import {FormValidator, dataInput} from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {popOpenEdit} from "../utils/constants.js";
import {formEditElem} from "../utils/constants.js";
import {prName} from "../utils/constants.js";
import {prAbout} from "../utils/constants.js";
import {popOpenAdd} from "../utils/constants.js";
import {formAddElem} from "../utils/constants.js";
import {elTitle} from "../utils/constants.js";
import {elImg} from "../utils/constants.js";
import {popCloseImg} from "../utils/constants.js";
import {cardsListSelector} from "../utils/constants.js";
import {initialCards}  from "../utils/constants.js";

const popupEdit = new PopupWithForm(".popup_format_edit", handleSubmitEditCard);

const cardsInfo = new UserInfo({
  usernameSelector: ".profile__author",
  aboutinfoSelector:  ".profile__author-about"
});

const popupAdd = new PopupWithForm(".popup_format_add", handleSubmitAddCard);
const formEdit = new FormValidator(dataInput, formEditElem);
const formAdd = new FormValidator(dataInput, formAddElem);
const popupWithImage = new PopupWithImage(".popup_format_image");

const cardList = 
  new Section({
    data: initialCards, // initialCards elements
    renderer: (item) => {

      const cardElement = createCard(item, ".elements__template", {
        handleCardClick:() =>{
          popupWithImage.open(item);
        }  
      });
      cardList.addItem(cardElement);
    }
  },
  cardsListSelector // html selector div for cards
);



function handleSubmitEditCard(){
  popupEdit.close();
  cardsInfo.setUserInfo(popupEdit.formValues);
}


function createCard(data, cardSelector, func){
  const card = new Card(data, cardSelector, func);
    return card.generateCard();
}


function handleSubmitAddCard(){
  popupAdd.close();
  const dataAdd = 
  { 
    name: popupAdd.formValues.title,
    link: popupAdd.formValues.link
  };
 
  const cardaddElement = createCard(dataAdd, ".elements__template", {
    handleCardClick:() =>{
      popupWithImage.open(dataAdd);
    }  
  });
  cardList.prependItem(cardaddElement);

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

popOpenAdd.addEventListener('click', function(){
  popupAdd.open();
  formAdd.disableButton();
  formAdd.clearFormErrors();
});

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

formEdit.enableValidation();
formAdd.enableValidation(); 

cardList.renderItems();
