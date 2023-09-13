import React from "react";
import Card from "./Card";
import noArticleFound from "../images/not-found_v1.svg";
function NewsList({
  newsData,
  addSearch,
  searchQuery,
  loading,
  noArticles,
  loggedIn,
  onAddPlace,
  cards,
  setCards,
  isBookmarked,
  setIsBookmarked,
  onLogin,
}) {
  function handleShowMore() {
    addSearch(searchQuery);
    const mainSection = document.getElementById("newslistSection");
    mainSection.scrollIntoView({ behavior: "smooth" });
  }
  const hasCardData = newsData.length > 0;
  return (
    <section id="newslistSection" className="newslist">
      <h3
        className={`newslist__subtitle ${
          hasCardData ? "newslist__subtitle_visible" : ""
        }`}
      >
        Search results
      </h3>

      <div className="newslist__wrapper">
        {loading ? (
          <div className="newslist__preloader">
            <div className="newslist__circle"></div>
          </div>
        ) : (
          <>
            <div
              className={`newslist__wrapper_none ${
                hasCardData ? "newslist_visible" : ""
              }`}
            >
              {newsData.map((item) => {
                const existingCard = cards.find(
                  (card) => card.text === item.description
                );
                const isBookmarked = !!existingCard;

                // Assuming you have a function like `setBookmark` to handle bookmark updates
                const handleBookmark = () => {
                  if (existingCard) {
                    // Set bookmark to true here
                    setIsBookmarked(true);
                  }
                };

                return (
                  <Card
                    cards={cards}
                    setCards={setCards}
                    searchQuery={searchQuery}
                    key={item.title}
                    onAddPlace={onAddPlace}
                    cardData={item}
                    loggedIn={loggedIn}
                    isBookmarked={isBookmarked}
                    handleBookmark={handleBookmark}
                    onLogin={onLogin} // Pass the bookmark handling function to the Card component
                  />
                );
              })}
            </div>

            <div
              className={`newslist__buttonwrapper ${
                hasCardData ? "newslist__buttonwrapper_visible" : ""
              }`}
            >
              <button onClick={handleShowMore} className="newslist__button">
                Show more
              </button>
            </div>
            <div
              className={`newslist__noarticles ${
                noArticles ? "newslist__noarticles_visible" : ""
              }`}
            >
              <img src={noArticleFound} alt="Not found" />

              <p className="newslist__nofoundtitle">Nothing found</p>
              <p className="newslist__nofoundsubtitle">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default NewsList;
