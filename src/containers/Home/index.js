import React from "react";

import "./index.scss";
import PictureHome from "../../assets/pictures/6146732a4a924dc062c72e2fa5e7bcda7cc6ac9b.jpeg";
import Container from "../Container";

const Home = () => {
  return (
    <Container>
      <div className="home-content">
        <div className="welcome-title">Welcome on Marvel's world !</div>
        <div className="picture-content">
          <img
            src={PictureHome}
            alt="Captain Marvel"
            className="picture-home"
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;
