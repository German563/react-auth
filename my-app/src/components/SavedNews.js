import React from "react";
import Card from "./Card";

function SavedNews({ cards, username, loggedIn, setCards }) {
  const hasCardData = cards.length;
  const allKeywords = Array.from(
    new Set(cards.flatMap((card) => card.keyword))
  );
  return (
    <section className="savednews">
      <div className="savednews__description">
        <h3 className="savednews__title">Saved articles</h3>
        <h2 className="savednews__maintitle">
          {username}, you have {hasCardData} saved articles
        </h2>
        <p className="savednews__subtitle">
          By keywords:{" "}
          <span className="savednews__keywords">
            {allKeywords.length <= 2
              ? allKeywords.join(", ")
              : `${allKeywords[0]}, ${allKeywords[1]}, and ${
                  allKeywords.length - 2
                } other`}
          </span>
        </p>
      </div>
      <div className="savednews__wrapper">
        <div
          className={`savednews__none ${hasCardData ? "savednews_visible" : ""}`}
        >
          {cards.map((item) => {
            return (
              <Card
                key={item.title}
                setCards={setCards}
                cardData={item}
                loggedIn={loggedIn}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SavedNews;
