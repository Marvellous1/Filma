import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../Pages/Main";
import favourite from "../Pages/favourite";
import MyWatchlist from "../Pages/MyWatchlist";
import Others from "../Pages/Others";
import MovieDetail from "../Pages/MovieDetail";
import SingleGenre from "../Pages/SingleGenre";
import Layout from "../Constant/Layout/Layout";
import Demo from "../Demo";

function Routes() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/s" component={Demo} />
          <Route exact path="/" component={Main} />
          <Route path="/movie/:id" component={MovieDetail} />
          <Route exact path="/genre/:id" component={SingleGenre} />
          <Route exact path="/favourite" component={favourite} />
          <Route exact path="/MyWatchlist" component={MyWatchlist} />
          <Route path="/:link" component={Others} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;
