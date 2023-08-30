import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Author from "./Author";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import PopupWithForm from "./PopupWithForm";
import NewsList from "./NewsList";
import SavedNews from "./SavedNews";
import Header from "./Header.js";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api, authApi } from "../utils/api";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(checkLoggedIn());
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isBackPopupOpen, setBackPopupOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [newsData, setNewsData] = React.useState([]);
  const [numCardsToShow, setNumCardsToShow] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    _id: "",
  });
  const [cards, setCards] = React.useState([]);
  const [noArticles, setNoArticles] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setMobile] = React.useState(() => {
    if (window.innerWidth < 768) {
      return true;
    } else {
      return false;
    }
  });
  const [tooltipPopupState, setTooltipPopupState] = React.useState({
    open: false,
    result: false,
    message: "",
  });

  function handleRegister() {
    closeAllPopups();
    setRegisterPopupOpen(true);
    setBackPopupOpen(true);
  }

  function handleLogin() {
    closeAllPopups();
    setLoginPopupOpen(true);
    setBackPopupOpen(true);
  }

  function closeAllPopups() {
    setRegisterPopupOpen(false);
    setLoginPopupOpen(false);
    setBackPopupOpen(false);
    setTooltipPopupState({
      ...tooltipPopupState,
      open: false,
      result: false,
      message: "",
    });
  }

  function checkLoggedIn() {
    return localStorage.getItem("token");
  }
  React.useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleTooltipOpen(result, message) {
    setTooltipPopupState({
      open: true,
      result: result,
      message: message,
    });
  }
  function isInputValid(value, validationType) {
    switch (validationType) {
      case "email":
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      case "password":
        return value.length >= 3;
      case "username":
        return value.length >= 3;
      default:
        return true;
    }
  }
  React.useEffect(() => {
    localStorage.setItem("username", currentUser.name);
  }, [currentUser.name]);
  function onSignUp(data) {
    const { username, email, password } = data;
    authApi
      .register({ name: username, email, password })
      .then(() => {
        handleTooltipOpen(true);
      })
      .then(() => {
        setTimeout(() => {
          onSignIn({ email, password });
          setLoggedIn(true);
          closeAllPopups();
        }, 1500);
      })
      .catch((err) => {
        handleTooltipOpen(false, `Try again: ${err}`);
      });
  }
  function onSignIn(data) {
    authApi
      .authorize(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("token", res.jwt);
        handleTooltipOpen(false);
        authApi
          .getProfileData()
          .then((data) => {
            setCurrentUser(data.data);
          })
          .catch((err) => console.log(err));

        closeAllPopups();
      })
      .catch((err) => {
        handleTooltipOpen(false, `Can't login: ${err}`);
      });
  }
  React.useEffect(() => {
    const onEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("keydown", onEscape);
    };
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchData(search) {
    try {
      setLoading(true);
      const data = await api.getData(search);
      const slicedData = data.articles.slice(0, numCardsToShow);
  
      // Filter out articles with null values for specific properties
      const filteredData = slicedData.filter(article => 
        article.author !== null &&
        article.content !== null &&
        article.description !== null &&
        article.publishedAt !== null &&
        article.source.id !== null &&
        article.source.name !== null &&
        article.title !== null &&
        article.url !== null &&
        article.urlToImage !== null
      );
  
      return filteredData;
    } catch (error) {
      console.log("Error fetching data:", error);
      return []; // Return an empty array in case of an error
    } finally {
      setLoading(false);
    }
  }
  

  function searchSubmit(search) {
    if (searchQuery === search) {
      addSearch();
    } else {
      setSearchQuery(search);
      setNumCardsToShow(3);
    }
  }

  async function addSearch() {
    setNumCardsToShow((prevNum) => prevNum + 3);
  }

  const fetchDataFunction = React.useCallback(
    (search) => {
      if (search) {
        fetchData(search)
          .then((data) => {
            if (data.length === 0) {
              setNoArticles(true);
            } else {
              setNoArticles(false);
              setNewsData(data);
            }
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
            setNoArticles(true);
          });
      }
    },
    [fetchData, setNoArticles, setNewsData]
  );
  
  React.useEffect(() => {
    fetchDataFunction(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCardsToShow]);

  React.useEffect(() => {
    authApi
      .getProfileData()
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (currentUser._id) {
      // Fetch cards based on the user's ID
      authApi
        .getCards()
        .then((data) => {
          const filteredCards = data.filter(
            (card) => card.owner === currentUser._id
          );
          setCards(filteredCards);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser._id]);

  function prepareHamburger() {
    setMenuOpen(!isMenuOpen);
  }
  React.useEffect(() => {
    const onScreenChange = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onScreenChange);

    return () => {
      window.removeEventListener("resize", onScreenChange);
    };
  }, []);
  return (
    <Router>
      <div className="body">
        <CurrentUserContext.Provider value={currentUser}>
          <div className={"page"}>
          <div className={`page__background ${isBackPopupOpen ? 'page__background_opened' : ''}`}></div>
            <header className="header">
              <Header
              isBackPopupOpen={isBackPopupOpen}
                prepareHamburger={prepareHamburger}
                setLoggedIn={setLoggedIn}
                onLogin={handleLogin}
                loggedIn={loggedIn}
                onClose={closeAllPopups}
                onSearch={searchSubmit}
                setUsername={setCurrentUser}
                username={currentUser.name}
                isMobile={isMobile}
                isMenuOpen={isMenuOpen}
              />
            </header>
            <Routes>
              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <SavedNews
                      loggedIn={loggedIn}
                      username={currentUser.name}
                      cards={cards}
                      setCards={setCards}
                      searchQuery={searchQuery}
                      newsData={newsData}
                      addSearch={addSearch}
                      loading={loading}
                      noArticles={noArticles}
                    />
                    <Footer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/*"
                element={
                  <>
                    <Main
                      prepareHamburger={prepareHamburger}
                      setLoggedIn={setLoggedIn}
                      onLogin={handleLogin}
                      loggedIn={loggedIn}
                      onClose={closeAllPopups}
                      onSearch={searchSubmit}
                      setUsername={setCurrentUser}
                      username={currentUser.name}
                      isMobile={isMobile}
                      isMenuOpen={isMenuOpen}
                    />
                    <NewsList
                      newsData={newsData}
                      addSearch={addSearch}
                      searchQuery={searchQuery}
                      loading={loading}
                      noArticles={noArticles}
                      cards={cards}
                      setCards={setCards}
                      loggedIn={loggedIn}
                    />
                    <Author />
                    <Footer />
                    <InfoTooltip
                      state={tooltipPopupState}
                      onLogin={handleLogin}
                      onClose={closeAllPopups}
                    />
                    <PopupWithForm
                      isBackOpen={isBackPopupOpen}
                      onSignUp={onSignUp}
                      isInputValid={isInputValid}
                    />
                    <Login
                      onClose={closeAllPopups}
                      isOpen={isLoginPopupOpen}
                      onRegister={handleRegister}
                      onLogin={handleLogin}
                      onSignIn={onSignIn}
                      isInputValid={isInputValid}
                    />
                    <Register
                      isInputValid={isInputValid}
                      onClose={closeAllPopups}
                      isOpen={isRegisterPopupOpen}
                      onRegister={handleRegister}
                      onLogin={handleLogin}
                      onSignUp={onSignUp}
                    />
                  </>
                }
              />
            </Routes>
          </div>
        </CurrentUserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
