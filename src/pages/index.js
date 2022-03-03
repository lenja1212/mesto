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
//Author

api.getAuthorInfo()
.then((data) => {
  cardsInfo.setUserInfo(data);
  cardsInfo.setUserAvatar(data.avatar);
  userId = data._id;
  // console.log(userId);
  api.getInitialCards()
  .then((cards) => {
    cardList.getSectionCards(cards);
    cardList.renderItems();
  })
  .catch((err) => { 
    console.log(`Ошибка. Запрос не выполнен ${err}`); 
  }); 
})
.catch((err) => { 
  console.log(`Ошибка. Запрос не выполнен ${err}`); 
});

const cardList = new Section({ //({renderer}, containerSelector)
  renderer:(item) => {
    if(item.owner.name == cardsInfo.getInfo().username){
    // console.log("equal")
      const cardElement = createCard(item, ".elements__template-with-delete");
      const isOwner = item.likes.some((likeOwner) =>{
        return likeOwner.name == cardsInfo.getInfo().username;
      })
      if(isOwner){
        cardElement.setLikeActive();
      }
      cardList.addItem(cardElement.generateCard());
    }
    else{
    // console.log("Not equal")
      const cardElement = createCard(item, ".elements__template-without-delete");
      const isOwner = item.likes.some((likeOwner) =>{
        return likeOwner.name == cardsInfo.getInfo().username;
      })
      if(isOwner){
        cardElement.setLikeActive();
      }
      cardList.addItem(cardElement.generateCard());
    }
  }
},
  cardsListSelector
);


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

function createCard(data, cardSelector){
  const card = new Card(data, cardSelector, {
    handleCardClick:() =>{
      popupWithImage.open(data);
    },
    handleDeleteCard: () =>{
      popupDelete.open();
      api.getCardId(data._id)
      popupDelete.getCard(card);
    },
    handleAddLike: (cardId) =>{
      api.addLike(cardId)
      .then((data) => {
        card.setLikesAmount(data.likes.length);
      })
    },
    handleDeleteLike: (cardId) =>{
      api.deleteLike(cardId)
      .then((data) => {
        card.setLikesAmount(data.likes.length);
      })
    }
  })
  return card;
}

function handleSubmitAddCard(inputValues){
  api.postNewCard(popupAdd)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const cardElement = createCard(data, ".elements__template-with-delete"); 
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
  
  // Save avatar at server
  api.patchAvatar(profileAvatar)
  .then(() =>{
    cardsInfo.setUserAvatar(popupChange.formValues.link)
    popupChange.close();
  })
  .catch((err) => { 
    console.log(`Ошибка. Запрос не выполнен ${err}`); 
  }) 
  .finally(() => {
    this.submitButton.textContent = "Cохранить";
  });
}

const deleteCard = () => {
  api.deleteCard()
  .then(()=>{
    popupDelete.close();
    this.card.removeCard();
  })
  .catch((err) => { 
    console.log(`Ошибка. Запрос не выполнен ${err}`); 
  });
}

function handleSubmitDeleteCard(){
  // console.log("card", this.card)
  api.deleteCard()
  .then(()=>{
    popupDelete.close();
    this.card.removeCard();
  })
  .catch((err) => { 
    console.log(`Ошибка. Запрос не выполнен ${err}`); 
  });
}

popOpenEdit.addEventListener('click', function(){
  const {
    username,
    aboutinfo
  } = cardsInfo.getInfo();
  // console.log(cardsInfo.getInfo());
  prName.value = username;
  prAbout.value = aboutinfo;
  popupEdit.open();
  formEdit.clearFormErrors();
});

popOpenAdd.addEventListener('click', function(){
  formAdd.disableButton();
  formAdd.clearFormErrors();
  popupAdd.open();
});

popOpenChange.addEventListener("click", () =>{
  formChange.clearFormErrors();
  popupChange.open();
})

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupChange.setEventListeners();

formEdit.enableValidation();
formAdd.enableValidation(); 
formChange.enableValidation();
