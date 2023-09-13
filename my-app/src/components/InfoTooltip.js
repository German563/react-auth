import React from "react";

function InfoTooltip(props) {
  const { state, onClose, onLogin } = props;
  const { open, result } = state;

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${open ? "popup__tooltip" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container  popup__container-tooltip">
        <button
          className="popup__close"
          id="closeButtonFoto"
          onClick={onClose}
        ></button>
        <h2 className="popup__tooltip-title">
          {result
            ? "Registration successfully completed!"
            : `Oops, something went wrong! Please try again.`}
        </h2>
      </div>
      <button
        type="button"
        className="popup__bottomlink-error"
        onClick={onLogin}
      >
        Sign in
      </button>
    </div>
  );
}

export default InfoTooltip;
