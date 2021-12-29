let popOpenEdit = document.querySelector(".profile__edit-button")
let popupEdit = document.querySelector(".popup_format_edit");
let formEditElem = document.querySelector(".popup__form_format_edit");
let prName = document.querySelector(".popup__input_format_title");
let prAbout = document.querySelector(".popup__input_format_subtitle");
let popCloseE = document.querySelector(".popup__close_format_edit");

let prAuthor = document.querySelector(".profile__author");
let prInfo = document.querySelector(".profile__author-about")

function openEditPopup(){
  prName.value = prAuthor.textContent;
  prAbout.value = prInfo.textContent;
  popupEdit.classList.add('popup_visible');
}

function closePopupE(){
  popupEdit.classList.remove('popup_visible');
}

function formSubmitHandler(evt){
  evt.preventDefault();
  prAuthor.textContent = prName.value;
  prInfo.textContent = prAbout.value;
  closePopupE();
}


popCloseE.addEventListener('click', closePopupE);
popOpenEdit.addEventListener('click', openEditPopup);
formEditElem.addEventListener('submit', formSubmitHandler);

/////////////////////////////////////////////////

let popOpenAdd = document.querySelector(".profile__add-button");
let popupAdd = document.querySelector(".popup_format_add");
let popCloseA = document.querySelector(".popup__close_format_add");
let formAddElem = document.querySelector(".popup__form_format_add");
let elTitle= document.querySelector(".popup__input_format_name");
let elImg = document.querySelector(".popup__input_format_link");
let popCloseI = document.querySelector(".popup__close_format_img");
let cardsGrid = document.querySelector(".elements");
let formImgElem = document.querySelector(".popup_format_image");


function closePopupI(){
  formImgElem.classList.remove('popup_visible');
}


function openAddPopup(){
  popupAdd.classList.add('popup_visible');
}

function closePopupA(){
  popupAdd.classList.remove('popup_visible');
}


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


//let elemImg = cardsArr[1].querySelector(".elements-image");
//console.log(elemImg.attributes);



const tempElems = document.querySelector(".elements__template").content;

function addCard(cardName, cardLink){
  const cardItem = tempElems.querySelector(".elements__item").cloneNode(true);
  cardItem.querySelector(".elements__image").src = cardLink;
  cardItem.querySelector(".elements__title").textContent = cardName;
  cardsGrid.append(cardItem);
  //like button
  cardItem.querySelector(".elements__like").addEventListener("click", function (evt){ 
    evt.target.classList.toggle("elements__like_active");
  });
  //delete button 
  cardItem.querySelector(".elements__item_close").addEventListener("click",function (){
    cardItem.remove();
  });
  //enlarge
  cardItem.querySelector(".elements__image").addEventListener("click",function (evt){
    evt.preventDefault();
    cardImg = document.querySelector(".popup_format_image");
    cardImg.querySelector(".popup__image").src = cardLink;
    cardImg.querySelector(".popup__subtitle").textContent = cardName;
    cardImg.classList.add('popup_visible');
  });
}

//function deleteCard(cardName, cardLink){

initialCards.forEach(function (item){
  addCard(item.name, item.link);
});

let cardsArr = document.querySelectorAll(".elements__item");

function formSubmitHandlerAdd(evt){
  evt.preventDefault();
  cardsArr[0].querySelector(".elements__image").src = elImg.value;
  cardsArr[0].querySelector(".elements__title").textContent = elTitle.value;
  closePopupA();
}



popOpenAdd.addEventListener('click', openAddPopup);
popCloseA.addEventListener('click', closePopupA);
formAddElem.addEventListener('submit', formSubmitHandlerAdd);
popCloseI.addEventListener('click', closePopupI);