import './index.css';

import {FormValidator, dataInput} from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {api} from "../components/Api.js";

import {formEditElem} from "../utils/constants.js";
import {prName} from "../utils/constants.js";
import {prAbout} from "../utils/constants.js";

import {popOpenEdit} from "../utils/constants.js";
import {popOpenAdd} from "../utils/constants.js";
import {popOpenChange} from "../utils/constants.js";
import {formAddElem} from "../utils/constants.js";
import {cardsListSelector} from "../utils/constants.js";
import {profileAvatar} from "../utils/constants.js";

import {popupDelete} from "../utils/constants.js";
import {formChangeElem} from "../utils/constants.js";

const cardsInfo = new UserInfo({
  usernameSelector: ".profile__author",
  aboutinfoSelector:  ".profile__author-about"
});

const popupEdit = new PopupWithForm(".popup_format_edit", handleSubmitEditCard);
const popupAdd = new PopupWithForm(".popup_format_add", handleSubmitAddCard);
const popupChange = new PopupWithForm(".popup_format_change", handleSubmitChangeCard);

const formEdit = new FormValidator(dataInput, formEditElem);
const formAdd = new FormValidator(dataInput, formAddElem);
const formChange = new FormValidator(dataInput, formChangeElem);

const popupWithImage = new PopupWithImage(".popup_format_image");



api.getAuthorInfo();
//Author
const authorInfo = api.getAuthorInfo();

authorInfo
.then((data) =>{
  cardsInfo.setUserInfo(data);
  profileAvatar.src = data.avatar;
})

//InitialCards
const dataCard = api.getInitialCards();

const cardSection = dataCard
.then((data) =>{
  const cardList = 
  new Section({
    data: data, // initialCards elements
    renderer: (item) => {
      authorInfo.then((data) => {
        if(item.owner.name == data.name){
          // console.log("equal")
          const cardElement = createCard(item, ".elements__template-with-delete", {
            handleCardClick:() =>{
              popupWithImage.open(item);
            }  
          });
          cardList.addItem(cardElement);
        }
        else{
          // console.log("Not equal")
          const cardElement = createCard(item, ".elements__template-without-delete", {
            handleCardClick:() =>{
              popupWithImage.open(item);
            }  
          });
          cardList.addItem(cardElement);
        }
      })
    }
  },
    cardsListSelector // html selector div for cards
  );
  cardList.renderItems();
  return cardList;
});

function handleSubmitEditCard(){
  popupEdit.close();
  cardsInfo.setUserInfo(popupEdit.formValues);
  // Save data at server
  api.patchAuthorInfo(popupEdit);
 
  this.submitButton.textContent = "Cохранить";
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
  dataAdd.likes = [];
  const cardElement = createCard(dataAdd, ".elements__template-with-delete", {
    handleCardClick:() =>{
      popupWithImage.open(dataAdd);
    }  
  });
  
  cardSection
  .then((data) => {
    data.prependItem(cardElement);
    return data;
  })
 // Save card at server
  api.postNewCard(popupAdd);
  this.submitButton.textContent = "Cоздать";
}

function handleSubmitChangeCard(){
  popupChange.close();
  profileAvatar.src = popupChange.formValues.link;
  // Save avatar at server
  api.patchAvatar(profileAvatar);
  this.submitButton.textContent = "Cохранить";
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

popOpenChange.addEventListener("click", () =>{
  popupChange.open();
  formChange.clearFormErrors();
})

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupChange.setEventListeners();

formEdit.enableValidation();
formAdd.enableValidation(); 
formChange.enableValidation();
