import{blockButtonWhenOpen, DataInput, clearFormErrors} from "./FormValidator.js";

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


const tempElems = document.querySelector(".elements__template").content;



function openPopup(popupName){
  popupName.classList.add('popup_visible');
  document.addEventListener("click", closeByClick);
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popupName){
  popupName.classList.remove('popup_visible');
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("click", closeByClick);
}

function handleSubmitEditCard(evt){
  evt.preventDefault();
  prAuthor.textContent = prName.value;
  prInfo.textContent = prAbout.value;
  closePopup(popupEdit);
}

function appendCard(Grid_of_cards, cardName){
  Grid_of_cards.append(cardName);
}

export function enlargeCard(cardName, cardLink){
  const cardImg = document.querySelector(".popup_format_image");
  cardImg.querySelector(".popup__image").src = cardLink;
  cardImg.querySelector(".popup__subtitle").textContent = cardName;
  openPopup(cardImg);
}

export function removeCard(oneCardItem){
  oneCardItem.remove();
}

export function addLikeButton(evt){
  evt.target.classList.toggle("elements__like_active");
}


function addCard(cardName, cardLink){
  const cardItem = tempElems.querySelector(".elements__item").cloneNode(true);
//  console.log(cardItem);
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
  });
  return cardItem;
}

function handleSubmitAddCard(evt){
  evt.preventDefault();
  cardsGrid.prepend(addCard(elTitle.value, elImg.value));
  closePopup(popupAdd);
}

////////////////////////////////////////


function closeByClick(evt){
  if(evt.target.classList.contains("popup")){
    closePopup(evt.target);
    document.removeEventListener("click", closeByClick);
  }
};

function closeByEsc(evt){
  if(evt.key === "Escape"){
    const openedPopup = document.querySelector(".popup_visible");
    closePopup(openedPopup);    
  }
};

popCloseEdit.addEventListener('click', function(){
  closePopup(popupEdit);
  clearFormErrors(formEditElem, DataInput.inputSelector, DataInput.errorClass);
});

popOpenEdit.addEventListener('click', function(){
  prName.value = prAuthor.textContent;
  prAbout.value = prInfo.textContent;
  openPopup(popupEdit);
});

formEditElem.addEventListener('submit', handleSubmitEditCard);

popOpenAdd.addEventListener('click', function(){
  elTitle.value = "";
  elImg.value= "";
  openPopup(popupAdd);
  blockButtonWhenOpen(buttonSubmitAdd, DataInput.inactiveButtonClass);
});

popCloseAdd.addEventListener('click', function(){
  closePopup(popupAdd);
  clearFormErrors(formAddElem, DataInput.inputSelector, DataInput.errorClass);
});

popCloseImg.addEventListener('click', function(){
  closePopup(formImgElem);
});

formAddElem.addEventListener('submit', handleSubmitAddCard);

