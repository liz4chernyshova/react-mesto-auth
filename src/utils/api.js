export class Api {
    constructor({address, headers}) {
      this._address = address;
      this._headers = headers;
    }
  
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }

    addCard(cardData) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
        .then(this._checkResponse)
    }

    likeCard(id, isLiked) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: isLiked ? 'PUT': 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    setUserAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
  
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    
}

const api = new Api({
    address: 'http://api.chernyshova.backend.nomoredomains.rocks',
    headers: {
      authorization:'fad10afc-9b25-4889-84c7-ba30776ae655',
      'Content-Type': 'application/json',
    }
});

export default api;
