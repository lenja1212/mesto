export default class UserInfo{
  constructor({usernameSelector, aboutinfoSelector}){
     this._username = document.querySelector(usernameSelector);
     this._aboutinfo = document.querySelector(aboutinfoSelector);
  }

  getInfo(){
    return {username: this._username.textContent, aboutinfo: this._aboutinfo.textContent};
  }

  setUserInfo(new_username, new_aboutinfo){
    this._username.textContent = new_username.value;
    this._aboutinfo.textContent = new_aboutinfo.value;
  }
}