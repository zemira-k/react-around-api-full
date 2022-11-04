// const BaseUrl = "http://localhost:3000";
// const BaseUrl = "https://api.around.students.nomoreparties.site";
const BaseUrl = "https://api.around.students.nomoredomainssbs.ru";

// students.nomoredomainssbs.ru
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}: ${res.statusText}`);

  // console.log("response: ", res);
  // return res.ok ? res.json() : Promise.reject(res.statusText);
}

export const register = (password, email) => {
  return fetch(`${BaseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => checkResponse(res));
};

export const login = (password, email) => {
  return fetch(`${BaseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BaseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};
