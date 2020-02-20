import React from "react";

import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../containers/Container";

const SearchBar = ({ onChange, search, onSubmit }) => {
  return (
    <>
      <Container>
        <div className="search-bar-container">
          <form className="form" onSubmit={onSubmit}>
            <div className="input-container">
              <FontAwesomeIcon icon="search" />
              <input
                type="text"
                placeholder="What do you search ?"
                className="input"
                search={search}
                onChange={onChange}
              />
            </div>
            <button className="button" type="submit">
              <div>Search</div>
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SearchBar;
