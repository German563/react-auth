import React from "react";
import PopupWithForm from "./PopupWithForm";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const [usernameError, setUsernameError] = React.useState("");
  const [username, setusername] = React.useState("");
  function handleChangeName(e) {
    setusername(e.target.value);
  }
  const isEmailValid = props.isInputValid(email, "email");
  const isPasswordValid = props.isInputValid(password, "password");
  const isUsernameValid = props.isInputValid(username, "username");
  const areInputsValid = isEmailValid && isPasswordValid && isUsernameValid;

React.useEffect(() => {
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

  if (isUsernameValid) {
    setUsernameError("");
  } else {
    setUsernameError("Username must be at least 3 characters");
  }
}, [isEmailValid, isPasswordValid, isUsernameValid]);


  function handleSubmit(e) {
    e.preventDefault();
    if (areInputsValid) {
      props.onSignUp({
        password,
        email,
        username,
      });
    }
  }

  return (
    <>
      <PopupWithForm
        emailError={emailError}
        areInputsValid={areInputsValid}
        email={email}
        password={password}
        username={username}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onRegister={props.onRegister}
        onLogin={props.onLogin}
        onSignUp={props.onSignUp}
        name="new-profile"
        title="Sign up"
        submitButtonText="Sign up"
      >
 <label className="popup__label" htmlFor="email">Email</label>
      <input
        className="popup__input"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleChangeEmail}
      />
      {emailError && <label className="popup__error">{emailError}</label>}
  
      <label className="popup__label" htmlFor="password">Password</label>
      <input
        className="popup__input"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handleChangePassword}
      />
      {passwordError && <label className="popup__error">{passwordError}</label>}

      <label className="popup__label" htmlFor="username">Username</label>
      <input
        className="popup__input"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={handleChangeName}
      />
      {usernameError && <label className="popup__error">{usernameError}</label>}
      </PopupWithForm>
    </>
  );
  
}

export default Register;