import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import Bookmark from "../images/bookmark.svg";
import Bookmark_active from "../images/bookmark_active.svg";
import Trash_can from "../images/trash-can.svg"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { authApi } from "../utils/api";
function Card({ cardData, loggedIn, onAddPlace, searchQuery, cards, setCards, newsData }) {
  const { source, title, date, url } = cardData;
  const currentUser = React.useContext(CurrentUserContext);
  const [maxLettersDescription , setmaxLettersDescription] = useState(140);
  const [maxLettersTitle , setMaxLettersTitle] = useState(80);
  const text = cardData.text || cardData.description; 
  const image = cardData.urlToImage || cardData.image;
  const truncatedDescription = text.length > maxLettersDescription ? text.slice(0, maxLettersDescription) + '...' : text;
  const truncatedTitleText = title.length > maxLettersTitle ? title.slice(0, maxLettersTitle) + '...' : title;


  const [isOwn] = useState(cardData.owner === currentUser._id);
  const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth <= 767) {
          setMaxLettersTitle(40)
          setmaxLettersDescription(130)
        }
        else if ( windowWidth >= 768 && windowWidth < 1090) {
          setMaxLettersTitle(47)
          setmaxLettersDescription(85)
        }
        else {
          setMaxLettersTitle(50)
          setmaxLettersDescription(185)
        }
      };
      handleResize(); 
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [cardData.description, cardData.title]);
  const handleCardDelete = () => {
    authApi
      .deleteCard(cardData._id)
      .then((res) => {
        setCards(newCards => newCards.filter(c => c._id !== cardData._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const handleAddCard = () => {
    const keyword = searchQuery;
    const date = cardData.publishedAt;
    const text = cardData.description;
    const link = cardData.url;
    const image = cardData.urlToImage;
    const modifiedCardData = { ...cardData, keyword, date, text, link, image };
    if (cards.some(existingCard => existingCard.text === modifiedCardData.text)) {
      setIsBookmarked(true); 
    } else {
    authApi
      .addNewCard(modifiedCardData)
      .then((newCardData) => {
        const newCards = [newCardData.data, ...cards];
        setCards(newCards);
setIsBookmarked(true);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };


  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const location = useLocation();
  return (
    <div className="card" >
<div className="card__wrapper">
{location.pathname === '/' && !loggedIn && <div className="card__sighintag">Sign in to save articles</div>}
  <span className={`card__keyword ${location.pathname === '/saved-news' ? 'card__keyword_active' : ''}`}>
            {cardData.keyword}
          </span>
          <span className={`card__deletetext ${location.pathname === '/saved-news' ? '' : 'card_hidden'}`}>
  Remove from saved
</span>
<div className="card__savetag">
  {isOwn ? (
    <img
      onClick={handleCardDelete}
      src={Trash_can}
      alt="Delete"
      className="card__deletetagimage"
    />
  ) : (
    <img
      onClick={handleAddCard}
      src={isBookmarked ? Bookmark_active : Bookmark}
      alt="Bookmark"
      className= {isBookmarked ? "card__savetagimageActive" : "card__savetagimage"}
    />
  )}
</div>
</div>
<div className="card__imagewrapper">
      {image && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img className="card__image" src={image} alt={cardData.title} />
        </a>
      )}
      </div>
      {date && (
        <span className="card__publishedat">{formattedDate}</span>
      )}
      <div className="card__info">
      {cardData.title && <h3 className = "card__title">{truncatedTitleText}</h3>}
        {truncatedDescription && (
        <p
          className="card__description"
          data-content={truncatedDescription}
        >
          {truncatedDescription}</p> )}
        {source && <p className="card__source">{source.name}</p>}
      </div>
    </div>
  );
}

export default Card;
