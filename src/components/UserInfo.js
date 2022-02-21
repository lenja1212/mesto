export default class UserInfo{
  constructor({usernameSelector, aboutinfoSelector}){
     this._username = document.querySelector(usernameSelector);
     this._aboutinfo = document.querySelector(aboutinfoSelector);
  }

  getInfo(){
    return {username: this._username.textContent, aboutinfo: this._aboutinfo.textContent};
  }

  setUserInfo(inputValues){
    this._username.textContent = inputValues.name;
    this._aboutinfo.textContent = inputValues.about;
  }
}

/*
  setUserInfo(newUsername, newAboutinfo){
    this._username.textContent = newUsername.value;
    this._aboutinfo.textContent = newAboutinfo.value;
  }
*/