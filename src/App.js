import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Characters from "./containers/Characters";
import Header from "./containers/Header";
import Comics from "./containers/Comics";
import Character from "./containers/Character";
import Home from "./containers/Home";
import Favorites from "./containers/Favorites";

library.add(faSearch);

function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/favorites">
            <Favorites />
          </Route>

          <Route path="/comics" exact>
            <Comics />
          </Route>

          <Route path="/comics/:page" exact>
            <Comics />
          </Route>

          <Route path="/character/:id">
            <Character />
          </Route>

          <Route path="/characters/:page" exact>
            <Characters />
          </Route>

          <Route path="/characters" exact>
            <Characters />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
