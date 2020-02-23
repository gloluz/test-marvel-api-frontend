import React from "react";

import "./index.scss";
import PictureHome from "../../assets/pictures/6146732a4a924dc062c72e2fa5e7bcda7cc6ac9b.jpeg";

const Home = () => {
  return (
    <>
      <div className="picture-content-home">
        <div className="home-content">
          <div className="welcome-title">Welcome to Marvel's world !</div>
        </div>
        <img src={PictureHome} alt="Captain Marvel" className="picture-home" />
      </div>
    </>
  );
};

export default Home;
