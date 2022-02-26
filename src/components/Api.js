export class Api{
  constructor(options){
    this._options = options;
    this._headers = this._options.headers;
    this._token = this._headers.authorization;
  }
  getCardId(id){
    this._cardId = id;
  }

  getCardIdServer(){
    return fetch('https://mesto.nomoreparties.co/v1/cohort36/cards', {
        headers: {
          authorization: this._token
        }
      })
      .then((res) =>{
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }) 
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort36/cards', {
      headers: {
        authorization: this._token
      }
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getAuthorInfo(){
    return fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
      headers: {
        authorization: this._token
      }
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    
  }

  patchAuthorInfo(formSelector){
    return fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formSelector.formValues.name,
        about: formSelector.formValues.about
      })
    })
  }

  postNewCard(formSelector){
    return fetch('https://mesto.nomoreparties.co/v1/cohort36/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formSelector.formValues.title,
        link: formSelector.formValues.link
      })
    }) 
  }

  patchAvatar(profileAvatar){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort36/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: profileAvatar.src
      })
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteLike(cardId){
    return  fetch(`https://mesto.nomoreparties.co/v1/cohort36/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addLike(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort36/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCard(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort36/cards/${this._cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }      
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a',
    'Content-Type': 'application/json'
  }
});