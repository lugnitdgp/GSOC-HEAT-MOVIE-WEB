import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Search from "./components/search-results";
import Bigcard from "./components/movies-main-card";
import Latest from "./components/latest-movie";
import Details from "./components/movie-detail"
import List from "./components/list";
import ButtonAppBar from "./components/navbar";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
         <ButtonAppBar />
      <Bigcard />
      <List u="popular" link="/popular"/>
      <List u="top_rated" link="/top"/>
      <List u="upcoming" link="/upcoming"/>
      <List u="now_playing" link="/nowplaying"/>
      </Route>
      <Route exact path="/popular">
        <ButtonAppBar />
          <Latest u="popular"/>
        </Route>
         <Route exact path="/top">
           <ButtonAppBar />
          <Latest u="top_rated"/>
        </Route>
        <Route exact path="/upcoming">
          <ButtonAppBar />
          <Latest u="upcoming"/>
        </Route>
        <Route exact path="/nowplaying">
          <ButtonAppBar />
          <Latest u="now_playing"/>
        </Route>
        <Route exact path="/:id">
          <ButtonAppBar />
          <Details />
        </Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
