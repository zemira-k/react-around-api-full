function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${
        props.card.name ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__close popup__close_type_image"
          type="button"
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
