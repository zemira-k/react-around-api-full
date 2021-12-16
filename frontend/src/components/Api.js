class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  costumFetch = (url, options) =>
    fetch(url, options).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText),
    );

  getInitialCards(token) {
    return this.costumFetch(`${this._url}/cards`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getUserInfo(token) {
    return this.costumFetch(`${this._url}/users/me`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  changeLikeCardStatus(id, isLiked, token) {
    return this.costumFetch(`${this._url}/cards/${id}/likes`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: `${isLiked ? "PUT" : "DELETE"}`,
    });
  }

  deleteCard(id, token) {
    return this.costumFetch(`${this._url}/cards/${id}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
  }

  setUserInfo(data, token) {
    return this.costumFetch(`${this._url}/users/me`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  setUserAvatar(data, token) {
    return this.costumFetch(`${this._url}/users/me/avatar`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({ avatar: data }),
    });
  }

  addCard(data, token) {
    return this.costumFetch(`${this._url}/cards`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export default Api;
