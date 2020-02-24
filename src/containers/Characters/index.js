import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./index.scss";
import Container from "../Container";
import SearchBar from "../../composants/SearchBar";
import Loader from "../../loader.svg";

const NUMBER_RESULT_PER_PAGE = 100;

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nbPages, setNbPages] = useState(0);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const { page = "1" } = useParams();

  const fetchData = async () => {
    const offset = (page - 1) * NUMBER_RESULT_PER_PAGE;

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/characters?limit=${NUMBER_RESULT_PER_PAGE}&offset=${offset}`
    );

    setData(response.data.data);
    setNbPages(Math.round(response.data.data.total / NUMBER_RESULT_PER_PAGE));
    setIsLoading(false);
  };

  const fetchDataWithNameQuery = async () => {
    const offset = (page - 1) * NUMBER_RESULT_PER_PAGE;

    setIsLoading(true);

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/characters?nameStartsWith=${search}&limit=${NUMBER_RESULT_PER_PAGE}&offset=${offset}`
    );
    setData(response.data.data);
    setNbPages(Math.round(response.data.data.total / NUMBER_RESULT_PER_PAGE));
    setIsLoading(false);
  };

  const handleSearch = event => {
    const value = event.target.value;

    setSearch(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchDataWithNameQuery();
  };

  const onAddToFavorite = (id, event) => {
    event.preventDefault();
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favoritesCharacters", JSON.stringify(newFavorites));
  };

  const pages = nbPages
    ? new Array(nbPages).fill(null).map((p, i) => `${i + 1}`)
    : [];

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }

    fetchData();
  }, [page]);

  useEffect(() => {
    const newFavorites = JSON.parse(
      localStorage.getItem("favoritesCharacters")
    );

    if (newFavorites) {
      setFavorites(newFavorites);
    }
  }, []);

  return (
    <Container className="main-container">
      {isLoading ? (
        <div className="loader">
          <img src={Loader} alt="loader" />
        </div>
      ) : (
        <>
          <SearchBar
            search={search}
            onChange={handleSearch}
            onSubmit={handleSubmit}
          />

          <section className="characters-container">
            {data.results.map((character, index) => {
              return (
                <div className="characters-content" key={character.id}>
                  <Link
                    className="character-container"
                    to={`/character/${character.id}`}
                  >
                    <div>
                      <h3 className="character-name">{character.name}</h3>
                    </div>
                    <div className="picture-container">
                      <img
                        className="picture"
                        src={
                          character.thumbnail.path +
                          "." +
                          character.thumbnail.extension
                        }
                        alt={character.name}
                      />
                    </div>
                    <div className="description">{character.description}</div>
                  </Link>
                  {!favorites.includes(character.id) && (
                    <button
                      className="favorite-button"
                      onClick={event => onAddToFavorite(character.id, event)}
                    >
                      Add to favorites
                    </button>
                  )}
                </div>
              );
            })}
          </section>

          {pages.length > 1 && (
            <div className="pagination">
              {pages.map(p => (
                <Link
                  key={p}
                  to={`/characters/${p}`}
                  className={p === page ? "link active" : "link"}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Characters;
