let popOpen = document.querySelector(".edit-button")
let popup = document.querySelector(".popup");
let formElem = document.querySelector(".form");
let prName = formElem.querySelector("#title");
let prAbout = formElem.querySelector("#subtitle");
let popClose = document.querySelector(".popup__close");

let prAuthor = document.querySelector(".profile__author");
let prInfo = document.querySelector(".profile__author-about")

function openPopup(){
  prName.value = prAuthor.textContent;
  prAbout.value = prInfo.textContent;
  popup.classList.add('popup_visible');
}

function closePopup(){
  popup.classList.remove('popup_visible');
}

function formSubmitHandler(evt){
  evt.preventDefault();
  prAuthor.textContent = prName.value;
  prInfo.textContent = prAbout.value;
  console.log("COOL");
  closePopup();
}

formElem.addEventListener('submit', formSubmitHandler);
popClose.addEventListener('click', closePopup);
popOpen.addEventListener('click', openPopup);
