import './index.css';

import {FormValidator, dataInput} from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {api} from "../components/Api.js";
import PopupDelete from '../components/PopupDelete.js';

import {
  formEditElem,
  prName,
  prAbout,
  popOpenEdit,
  popOpenAdd,
  popOpenChange,
  formAddElem,
  cardsListSelector, 
  profileAvatar,
//  popupDelete,
  formChangeElem
} from "../utils/constants.js";



const cardsInfo = new UserInfo({
  usernameSelector: ".profile__author",
  aboutinfoSelector:  ".profile__author-about",
  avatarSelector: ".profile__avatar"
});

const popupEdit = new PopupWithForm(".popup_format_edit", handleSubmitEditCard);
const popupAdd = new PopupWithForm(".popup_format_add", handleSubmitAddCard);
const popupChange = new PopupWithForm(".popup_format_change", handleSubmitChangeCard);
const popupDelete = new PopupDelete(".popup_format_delete-card", handleSubmitDeleteCard)

const formEdit = new FormValidator(dataInput, formEditElem);
const formAdd = new FormValidator(dataInput, formAddElem);
const formChange = new FormValidator(dataInput, formChangeElem);

const popupWithImage = new PopupWithImage(".popup_format_image");


let userId = {};
let initialCards = [];
//Author

const cardList = 
  new Section({
  //  data: data, // initialCards elements
    renderer: (item) => {
      api.getAuthorInfo()
      .then((data) => {
        cardsInfo.setUserInfo(data);
        cardsInfo.setUserAvatar(data.avatar);
        if(item.owner.name == data.name){
          // console.log("equal")
          const cardElement = createCard(item, ".elements__template-with-delete", {
            handleCardClick:() =>{
              popupWithImage.open(item);
            },
            handleDeleteCard: () =>{ // (cardId) =>{
              popupDelete.open();
              api.getCardId(item._id)
              popupDelete.getCard(cardElement);
            } 
          });
    //      console.log(cardElement);
          cardList.addItem(cardElement.generateCard());
        }
        else{
          // console.log("Not equal")
          const cardElement = createCard(item, ".elements__template-without-delete", {
            handleCardClick:() =>{
              popupWithImage.open(item);
            },
            handleDeleteCard: () =>{//cardId) =>{
              popupDelete.open();
              api.getCardId(item._id)
              popupDelete.getCard(cardElement);
            }  
          });

          cardList.addItem(cardElement.generateCard());
        }
      })
      .catch((err) => { 
        console.log(`Ошибка. Запрос не выполнен ${err}`); 
      }); 
    }    
  },
    cardsListSelector // html selector div for cards
  );

//InitialCards

api.getInitialCards()
.then((cards) => {
  cardList.getSectionCards(cards);
  cardList.renderItems();
})
.catch((err) => { 
  console.log(`Ошибка. Запрос не выполнен ${err}`); 
}); 

function handleSubmitEditCard(inputValues){
  // Save data at server
  api.patchAuthorInfo(popupEdit)
  .then(() => {
    popupEdit.close();
    cardsInfo.setUserInfo(inputValues);
  })
  .catch((err) => { 
    console.log(`Ошибка. Запрос не выполнен ${err}`); 
  })
  .finally(() => {
    this.submitButton.textContent = "Cохранить";
  });

}


function createCard(data, cardSelector, funcOpen, funcDel){
  const card = new Card(data, cardSelector, funcOpen, funcDel);
  return card;
}

function handleSubmitAddCard(inputValues){
  api.postNewCard(popupAdd)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log("DATA", data);
    const cardElement = createCard(data, ".elements__template-with-delete", {
      handleCardClick:() =>{
        popupWithImage.open(data);
      },
      handleDeleteCard: () =>{
        popupDelete.open();
        api.getCardId(data._id)
        popupDelete.getCard(cardElement);
      }
    });    
    cardList.prependItem(cardElement.generateCard());
    popupAdd.close();
  })
  .catch((err) => { 
    console.log(`Ошибка. Запрос не выполнен ${err}`); 
  }) 
  .finally(() => {
    this.submitButton.textContent = "Cоздать";
  });


  
  const dataAdd = 
  { 
    name: popupAdd.formValues.title,
    link: popupAdd.formValues.link
  };
  dataAdd.likes = [];

 // Save card at server
}

function handleSubmitChangeCard(){
  
  // profileAvatar.src = popupChange.formValues.link;
  // Save avatar at server
  cardsInfo.setUserAvatar(popupChange.formValues.link)
  api.patchAvatar(profileAvatar)
  .then(() =>{
    popupChange.close();
  })
  .catch((err) => { 
    console.log(`Ошибка. Запрос не выполнен ${err}`); 
  }) 
  .finally(() => {
    this.submitButton.textContent = "Cохранить";
  });
}

function handleSubmitDeleteCard(){
  // console.log("card", this.card)
  popupDelete.close();
  this.card.removeCard();
  api.deleteCard()
  .catch((err) => { 
    console.log(`Ошибка. Запрос не выполнен ${err}`); 
  });
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
