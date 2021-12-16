import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <div>
      <PopupWithForm
        header="Edit profile"
        name="edit"
        buttonTitle="save"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChangeName}
          className="form__input form__input_type_name"
          type="text"
          name="formName"
          id="formName"
          minLength="2"
          maxLength="40"
          required
          pattern=".*\S.*"
          value={name || ""}
        />
        <span
          className="form__input-error form__input-error_type_name form__input-error_active"
          id="formName-error"
        ></span>
        <input
          onChange={handleChangeAbout}
          className="form__input form__input_type_about"
          type="text"
          name="formAbout"
          id="formAbout"
          minLength="2"
          maxLength="200"
          required
          pattern=".*\S.*"
          value={about || ""}
        />
        <span
          className="form__input-error form__input-error_type_about form__input-error_active"
          id="formAbout-error"
        ></span>
      </PopupWithForm>
    </div>
  );
}

export default EditProfilePopup;
