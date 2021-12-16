import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const linkInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: linkInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      header="Change profile picture"
      buttonTitle="save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={linkInput}
        className="form__input form__input_type_link"
        type="url"
        name="avatarImageLink"
        id="avatarImageLink"
        required
      />
      <span
        className="form__input-error form__input-error_type_link form__input-error_active"
        id="avatarImageLink-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
