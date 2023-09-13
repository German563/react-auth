import React from "react";
import avatar__image from "../images/avatar__author.png";
function Author(props) {
  return (
    <section className="author">
      <div className="author__section">
        <img
          className="author__avatar"
          src={avatar__image}
          alt="author__avatar"
        />
        <div className="author__wrapper">
          <h2 className="author__title">About the author</h2>
          <h3 className="author__subtitle">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            <br />
            <br />
            You can also talk about your experience with Practicum, what you
            learned there, and how you can help potential customers.
          </h3>
        </div>
      </div>
    </section>
  );
}
export default Author;
