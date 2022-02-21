export class Api{
  constructor(options){
    this._options = options;
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort36/cards', {
      headers: {
        authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a'
      }
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен ${err}`);
    });
  }

  getAuthorInfo(){
    return fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
      headers: {
        authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a'
      }
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен ${err}`);
    });
  }

  patchAuthorInfo(formSelector){
    return fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formSelector.formValues.name,
        about: formSelector.formValues.about
      })
    })
  }

  postNewCard(formSelector){
    fetch('https://mesto.nomoreparties.co/v1/cohort36/cards', {
      method: 'POST',
      headers: {
        authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a',
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
        authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a',
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
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен ${err}`);
    });    
  }

  deleteLike(cardId){
    return  fetch(`https://mesto.nomoreparties.co/v1/cohort36/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a'
      }
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен ${err}`);
    });  
  }

  addLike(cardId){
    //console.log(cardId);
    return fetch(`https://mesto.nomoreparties.co/v1/cohort36/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a'
      }
    })
    .then((res) =>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен ${err}`);
    }); 
  }

  deleteCard(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort36/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: '54eb54c4-19b7-4cb8-b572-816ad644943a'
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