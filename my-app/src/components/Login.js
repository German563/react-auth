import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  let navigate = useNavigate();

  const isEmailValid = props.isInputValid(email, "email");
  const isPasswordValid = props.isInputValid(password, "password");
  const areInputsValid = isEmailValid && isPasswordValid;

  useEffect(() => {
    if (isEmailValid) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format");
    }

    if (isPasswordValid) {
      setPasswordError("");
    } else {
      setPasswordError("Password must be at least 3 characters");
    }
  }, [isEmailValid, isPasswordValid]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("send request");
    props.onSignIn({
      password,
      email,
    });
    setTimeout(() => {
      navigate("/saved-news");
    }, 1000);
  }

  return (
    <>
      <PopupWithForm
        areInputsValid={areInputsValid}
        email={email}
        password={password}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onRegister={props.onRegister}
        onLogin={props.onLogin}
        onSignIn={props.onSignIn}
        name="Sign in"
        title="Sign in"
        submitButtonText="Sign in"
      >
        <div className="popup__inputContainer">
          <label className="popup__label" htmlFor="email">
            Email
          </label>
          <input
            className="popup__input"
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChangeEmail}
          />
          {emailError && <label className="popup__error">{emailError}</label>}
        </div>

        <div className="popup__inputContainer">
          <label className="popup__label" htmlFor="password">
            Password
          </label>
          <input
            className="popup__input"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChangePassword}
          />
          {passwordError && <label className="popup__error">{passwordError}</label>}
        </div>
      </PopupWithForm>
    </>
  );
}

export default Login;
