import React from "react";

function PopupWithForm({
  isBackOpen,
  isOpen,
  onClose,
  name,
  title,
  children,
  submitButtonText,
  onSubmit,
  onRegister,
  onLogin,
  onSignUp,
  onSignIn,
  handleOverlayClose,
  email,
  password,
  username,
  areInputsValid,
}) {
  function handleSubmit(evt) {
    evt.preventDefault(); // Prevent the default form submission behavior
    if (submitButtonText === "Sign up") {
      onSignUp({
        email,
        password,
        username,
      }); // Call the onSignUp function passed as a prop
    } else {
      onSignIn({
        email,
        password,
      }); // Call the onSubmit function passed as a prop
    }
  }

  return (
    <div>
      <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <form className="popup__container" name={name} onSubmit={handleSubmit}>
          <button type="button" className="popup__close" onClick={onClose} />
          <h2 className="popup__title">{title}</h2>
          {children}
<div className="popup__buttomwrapper">
<button
            type="submit"
            className={`popup__button ${
              areInputsValid ? "" : "popup__button_disable"
            }`}
          >
            {submitButtonText}
          </button>
          {submitButtonText === "Sign up" ? (
            <div className="popup__bottomwrapper">
              or{" "}
              <button
                type="button"
                className="popup__bottomlink"
                onClick={onLogin}
              >
                Sign in
              </button>
            </div>
          ) : (
            <div className="popup__bottomwrapper">
              or{" "}
              <button
                type="button"
                className="popup__bottomlink"
                onClick={onRegister}
              >
                Sign up
              </button>
            </div>
          )}
</div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
