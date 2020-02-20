import React, { useState, useEffect } from "react";
import axios from "axios";

import "./index.scss";
import Container from "../Container";
import { useParams, Link } from "react-router-dom";
import SearchBar from "../../composants/SearchBar";

const NUMBER_RESULT_PER_PAGE = 100;

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nbPages, setNbPages] = useState(0);
  const [search, setSearch] = useState("");

  const { page = "1" } = useParams();

  const fetchData = async () => {
    const offset = (page - 1) * NUMBER_RESULT_PER_PAGE;

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/comics?limit=${NUMBER_RESULT_PER_PAGE}&offset=${offset}`
    );

    setData(response.data.data.results);
    setNbPages(Math.round(response.data.data.total / NUMBER_RESULT_PER_PAGE));
    setIsLoading(false);
  };

  const fetchDataWithTitleQuery = async () => {
    const offset = (page - 1) * NUMBER_RESULT_PER_PAGE;

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/comics?limit=${NUMBER_RESULT_PER_PAGE}&offset=${offset}&titleStartsWith=${search}`
    );

    setData(response.data.data.results);
    setNbPages(Math.round(response.data.data.total / NUMBER_RESULT_PER_PAGE));
    setIsLoading(false);
  };

  const handleSearch = event => {
    const value = event.target.value;

    setSearch(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetchDataWithTitleQuery();
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

  return (
    <Container className="main-container">
      {isLoading ? (
        <p>En cours de chargement ...</p>
      ) : (
        <>
          <SearchBar
            search={search}
            onChange={handleSearch}
            onSubmit={handleSubmit}
          />
          <div className="comics-container">
            {data.map((character, index) => {
              return (
                <div key={index} className="comic-container">
                  <div>
                    <h3 className="comic-name">{character.title}</h3>
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
                  <div className="description-content">
                    <div className="description">{character.description}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {pages.length > 1 && (
            <div className="pagination">
              {pages.map(p => (
                <Link
                  key={p}
                  to={`/comics/${p}`}
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

export default Comics;
