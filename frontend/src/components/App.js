import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth";
// routs components
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
// popup components
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = useHistory();

  // states for login logout and register
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [infoToolTip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccessful: false,
  });
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  // states for cards and user
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  // check if logged in
  React.useEffect(() => {
    // if user has a token in storage, check if it is valid
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  }, [token, history]);

  //get user info && cards
  React.useEffect(() => {
    if (token) {
      api
        .getUserInfo(token)
        .then((res) => {
          setCurrentUser(res.data);
          api
            .getInitialCards(token)
            .then((cards) => {
              setCards(cards);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  // handles for cards
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data, token)
      .then((newCard) => {
        setCards([...cards, newCard.data]);
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        const { data } = newCard;
        setCards((state) => state.map((c) => (c._id === card._id ? data : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, token)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  // handles for user
  function handleUpdateUser(data) {
    api
      .setUserInfo(data, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data.avatar, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // handles for login logout and register
  function handleLogin({ email, password }) {
    setEmail(email);
    if (!email || !password) {
      console.log("fail");
      return;
    }
    console.log("success");
    auth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    console.log("logged out");
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/");
  }

  function handleRegister({ email, password }) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          handleSuccessTooltip();
          history.push("/signin");
          console.log("Register success");
        }
      })
      .catch((err) => {
        handleFailureTooltip();
        console.log("Something went wrong.");
      });
  }

  // handles to open and close popups
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  const handleSuccessTooltip = () => {
    setInfoTooltip({
      isOpen: true,
      isSuccessful: true,
    });
  };

  const handleFailureTooltip = () => {
    setInfoTooltip({
      isOpen: true,
      isSuccessful: false,
    });
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoTooltip({
      isOpen: false,
      isSuccessful: false,
    });
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/signin">
            <Header link="/signup" text="sign up" />
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Header link="/signin" text="Log in" />
            <Register onRegister={handleRegister} />
          </Route>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Header
              link="/signin"
              text="Log in"
              loggedin={loggedIn}
              email={email}
              onSignOut={handleLogout}
            />
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          </ProtectedRoute>
        </Switch>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={infoToolTip.isOpen}
          isSuccessful={infoToolTip.isSuccessful}
          onClose={closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
