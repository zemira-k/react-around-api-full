import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({
      email: email,
      password: password,
    });
  }

  return (
    <div className="black-form">
      <p className="form__header black-form__header">Sign in</p>
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
          <p type="submit" className="form__link">
            Sign in
          </p>
        </button>
      </form>

      <div className="form__signin">
        <p className="form__signin-text">Not a member yet? </p>
        <Link to="signup" className="form__signin-link">
          Sign up here!
        </Link>
      </div>
    </div>
  );
}

export default Login;
