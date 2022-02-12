export default class Popup{
  constructor(popupSelector){
    this._selectedPopup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt){
    if(evt.key === "Escape"){
      this.close();
    }
  }

  setEventListeners(){
    this._closeButton = this._selectedPopup.querySelector(".popup__close");
    this._closeButton.addEventListener("click", () =>{
      this.close();
    });
    this._selectedPopup.addEventListener("mousedown", (evt) =>{
      if(evt.target.classList.contains("popup")){
        this.close();
      }
    });
  }
  
  open(){
    this._selectedPopup.classList.add('popup_visible');
    document.addEventListener("keydown", this._handleEscClose);
  }
  
  close(){
  //  console.log(this._selectedPopup);
    this._selectedPopup.classList.remove('popup_visible');
    document.removeEventListener("keydown", this._handleEscClose);

  }
}
