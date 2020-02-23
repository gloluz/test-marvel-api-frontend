import React from "react";

import "./index.scss";
import Logo from "../../assets/pictures/40cf70708803e095cd14339418413033.png";
import Container from "../Container";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Container className="container">
        <Link to="/" className="link">
          <img src={Logo} alt="marvel" className="logo" />
        </Link>

        <div className="list-content">
          <ul className="list">
            <Link to="/characters" className="link">
              <li className="link">Characters</li>
            </Link>
            <Link to="/comics" className="link">
              <li className="link">Comics</li>
            </Link>

            <li className="link">Favorites</li>
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Header;
