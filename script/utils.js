function openPopup(popupName){
  popupName.classList.add('popup_visible');
  document.addEventListener("mousedown", closeByClick);
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popupName){
  popupName.classList.remove('popup_visible');
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("click", closeByClick);
}

function closeByClick(evt){
  if(evt.target.classList.contains("popup")){
    closePopup(evt.target);
  }
};

function closeByEsc(evt){
  if(evt.key === "Escape"){
    const openedPopup = document.querySelector(".popup_visible");
  //  console.log(document.querySelector(".popup_visible").querySelector(dataInput.formSelector));
    closePopup(openedPopup);    
  }
};

export {openPopup, closePopup}