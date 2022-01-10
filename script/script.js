const popOpenEdit = document.querySelector(".profile__edit-button")
const popupEdit = document.querySelector(".popup_format_edit");
const formEditElem = document.querySelector(".popup__form_format_edit");
const prName = document.querySelector(".popup__input_format_title");
const prAbout = document.querySelector(".popup__input_format_subtitle");
const popCloseEdit = document.querySelector(".popup__close_format_edit");

const prAuthor = document.querySelector(".profile__author");
const prInfo = document.querySelector(".profile__author-about")

function openPopup(popupName){
  popupName.classList.add('popup_visible');
}

function closePopup(popupName){
  popupName.classList.remove('popup_visible');
}

function handleSubmitEditCard(evt){
  evt.preventDefault();
  prAuthor.textContent = prName.value;
  prInfo.textContent = prAbout.value;
  closePopup(popupEdit);
}


popCloseEdit.addEventListener('click', function(){
  closePopup(popupEdit);
});

popOpenEdit.addEventListener('click', function(){
  prName.value = prAuthor.textContent;
  prAbout.value = prInfo.textContent;
  openPopup(popupEdit);
});

formEditElem.addEventListener('submit', handleSubmitEditCard);

/////////////////////////////////////////////////

const popOpenAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_format_add");
const popCloseAdd = document.querySelector(".popup__close_format_add");
const formAddElem = document.querySelector(".popup__form_format_add");
const elTitle= document.querySelector(".popup__input_format_name");
const elImg = document.querySelector(".popup__input_format_link");
const popCloseImg = document.querySelector(".popup__close_format_img");
const cardsGrid = document.querySelector(".elements");
const formImgElem = document.querySelector(".popup_format_image");



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

const tempElems = document.querySelector(".elements__template").content;


function appendCard(Grid_of_cards, cardName){
  Grid_of_cards.append(cardName);
}

function enlargeCard(cardName, cardLink){
  cardImg = document.querySelector(".popup_format_image");
  cardImg.querySelector(".popup__image").src = cardLink;
  cardImg.querySelector(".popup__subtitle").textContent = cardName;
}

function removeCard(oneCardItem){
  oneCardItem.remove();
}

function addLikeButton(evt){
  evt.target.classList.toggle("elements__like_active");
}


function addCard(cardName, cardLink){
  const cardItem = tempElems.querySelector(".elements__item").cloneNode(true);
  cardItem.querySelector(".elements__image").src = cardLink;
  cardItem.querySelector(".elements__title").textContent = cardName;
  //like button
  cardItem.querySelector(".elements__like").addEventListener("click", addLikeButton);
  //delete button 
  cardItem.querySelector(".elements__item_close").addEventListener("click",function (){
    removeCard(cardItem);
  });
  //enlarge
  cardItem.querySelector(".elements__image").addEventListener("click", function (){
    enlargeCard(cardName, cardLink);
    openPopup(cardImg);
  });
  return cardItem;
}

//function deleteCard(cardName, cardLink){

initialCards.forEach(function (item){
  appendCard(cardsGrid, addCard(item.name, item.link));
});


function handleSubmitAddCard(evt){
  evt.preventDefault();
  cardsGrid.prepend(addCard(elTitle.value, elImg.value));
  closePopup(popupAdd);
}



popOpenAdd.addEventListener('click', function(){
  openPopup(popupAdd);
});
popCloseAdd.addEventListener('click', function(){
  closePopup(popupAdd);
});
popCloseImg.addEventListener('click', function(){
  closePopup(formImgElem);
});

formAddElem.addEventListener('submit', handleSubmitAddCard);

////////////////////////////////////////
/*
//const formEditElem = document.querySelector(".popup__form_format_edit");
const titleError = formEditElem.querySelector(`.${prName.id}-error`);

prName.addEventListener("input", function(evt){
  console.log(evt.target.validity.valid);
});
*/



document.addEventListener("click", function(evt){
  if(evt.target.classList.contains("popup")){
    closePopup(evt.target);
  }
});

document.addEventListener("keydown", function(evt){
  const openedPopup = document.querySelector(".popup_visible");
//  if(evt.target.classList.contains('popup')){
  if(evt.key === "Escape"){
    closePopup(openedPopup);
  }
});

