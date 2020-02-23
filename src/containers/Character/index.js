import React, { useState, useEffect } from "react";

import "./index.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "../Container";
import Loader from "../../loader.svg";

const Character = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/character/${id}`
      );

      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <div className="loader">
          <img src={Loader} alt="loader" />
        </div>
      ) : (
        <div>
          {data.map((character, index) => {
            return (
              <article key={character.id} className="character-main-content">
                <div className="picture-content">
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
                <h2 className="title">{character.name}</h2>
                <div className="description">{character.description}</div>
                <ul className="comics-list">
                  {character.comics.items.map((comic, index) => (
                    <li key={index} className="comics-item">
                      {comic.name}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default Character;
