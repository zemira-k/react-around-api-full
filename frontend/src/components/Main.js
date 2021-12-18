// import api from "../utils/api";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <button
            onClick={props.onEditAvatarClick}
            aria-label="profile__editbutton"
            className="profile__editbutton profile__editbutton_type_avatar"
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__caption">
            <h1 className="profile__name" id="name">
              {currentUser.name}
            </h1>
            <button
              onClick={props.onEditProfileClick}
              aria-label="profile__editbutton"
              className="profile__editbutton profile__editbutton_type_data"
              type="button"
              id="btnOpen"
            ></button>
          </div>
          <p className="profile__task" id="task">
            {currentUser.about}
          </p>
        </div>
        <button
          onClick={props.onAddPlaceClick}
          aria-label="add-pic"
          className="profile__big-rectangle"
          type="button"
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((cardEl) => (
          <Card
            key={cardEl._id}
            card={cardEl}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
