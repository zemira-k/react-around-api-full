import React from "react";
import union from "../images/Union.svg";
import unionx from "../images/UnionX.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_info ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__form">
        <button
          onClick={props.onClose}
          aria-label="popup__close"
          className={`popup__close`}
          type="button"
          id="btnClose"
        ></button>
        <div className="info" name={props.name}>
          <img
            className="info__image"
            src={`${props.isSuccessful ? union : unionx}`}
            alt={`${props.isSuccessful ? "success" : "fail"}`}
          ></img>
          <p className="info__text">{`${
            props.isSuccessful
              ? "Success! You have now been registered."
              : "Oops, something went wrong! Please try again."
          }`}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
