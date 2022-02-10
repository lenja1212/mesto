export default class Popup{
  constructor(popupSelector){
    this._selectedPopup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt){
    if(evt.key === "Escape" &&  document.querySelector(".popup_visible") !== null){
      this.close();
    }
  }

  setEventListeners(){
    this._closeButton = this._selectedPopup.querySelector(".popup__close");
    this._closeButton.addEventListener("click", () =>{
      this.close();
    });
    if(this._selectedPopup.classList.contains("popup")){
      document.addEventListener("mousedown", (evt) =>{
        if(evt.target.classList.contains("popup")){
          this.close();
        }
      });
    }
  
  }

  open(){
    this._selectedPopup.classList.add('popup_visible');
    this.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }
  
  close(){
  //  console.log(this._selectedPopup);
    this._selectedPopup.classList.remove('popup_visible');
    document.removeEventListener("keydown", this._handleEscClose.bind(this));

  }
}
