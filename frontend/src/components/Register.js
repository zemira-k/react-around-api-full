import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({
      email: email,
      password: password,
    });
  }

  return (
    <div className="black-form">
      <p className="form__header black-form__header">Sign up</p>
      <form onSubmit={handleSubmit} className="form form_type_black">
        <input
          className="form__input form__input_type_black"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form__input form__input_type_black"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="form__button form__button_container">
          <p className="form__link">Sign up</p>
        </button>
      </form>

      <div className="form__signin">
        <p className="form__signin-text">Already a member?</p>
        <Link to="signin" className="form__signin-link">
          Log in here!
        </Link>
      </div>
    </div>
  );
}

export default Register;
