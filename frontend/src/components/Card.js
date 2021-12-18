import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  // const isLiked = currentUser && props.card.likes.filter(currentUser._id);

  const isLiked = props.card.likes.includes(currentUser._id);
  // const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardDeleteButtonClassName = `element__btn element__btn_type_trash ${
    isOwn ? "element__btn_type_trash-visible" : "element__btn_type_trash-hidden"
  }`;
  const cardLikeButtonClassName = `${
    isLiked
      ? "element__name-heart element__name-heart_type_black"
      : "element__name-heart"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <button
        onClick={handleClick}
        className="element__btn element__btn_type_image"
        type="button"
      >
        <img
          className="element__item"
          src={props.card.link}
          alt={props.card.name}
        />
      </button>
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
      ></button>
      <div className="element__name">
        <h2 className="element__name-text">{props.card.name}</h2>
        <div className="element__name-like">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <span className="element__name-number">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Card;
