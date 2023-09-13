import React from "react";

function Main(props) {
  const [search, setSearch] = React.useState("");

  function handleSearchValue(e) {
    setSearch(e.target.value);
  }
  function handleSearchSubmit(e) {
    // Call the onSearch function with the search term when the "Search" button is clicked
    e.preventDefault();
    props.onSearch(search);
  }
  return (
    <main className="main">
      <div className="main__block">
        <h1 className="main__title">What's going on in the world?</h1>
        <h2 className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
        <div className="main__wrapper">
          <form className="main__form" onSubmit={handleSearchSubmit}>
            <input
              className="main__input"
              type="search"
              placeholder="Enter topic"
              value={search}
              onChange={handleSearchValue}
            />
            <button className="main__button">Search</button>
          </form>
        </div>
      </div>
    </main>
  );
}
export default Main;
