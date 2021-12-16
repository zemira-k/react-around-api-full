import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: name,
      link: link,
    });
    props.onClose();
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      header="New place"
      buttonTitle="create"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeName}
        className="form__input form__input_type_title"
        type="text"
        name="formTitle"
        id="formTitle"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
        pattern=".*\S.*"
        value={name}
      />
      <span
        className="form__input-error form__input-error_type_title form__input-error_active"
        id="formTitle-error"
      ></span>
      <input
        onChange={handleChangeLink}
        className="form__input form__input_type_img-link"
        type="url"
        name="formLink"
        id="formLink"
        placeholder="Image link"
        required
        value={link}
      />
      <span
        className="form__input-error form__input-error_type_img-link form__input-error_active"
        id="formLink-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
