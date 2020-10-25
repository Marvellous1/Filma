import React, { Component } from "react";

import Error from "../Error";
import { Container, List, Icon } from "semantic-ui-react";
import BackDropSlide from "../Component/Slides/BackDropSlide";
import Slides from "../Component/Slides/Slides";
import fetch from "isomorphic-unfetch";
import Loading from "../Constant/Loading/Loading";
import Random from "../Component/Random";
import { Link } from "react-router-dom";

export default class Main extends Component {
  state = {
    hot: "",
    mobile: "",
    isLoading: true,
  };
  componentDidMount() {
    const mobile = window.innerWidth;
    this.setState({ mobile });
    this.getProps();
  }

  async getProps() {
    try {
      this.setState({ isLoading: true });
      var today = new Date();
      var month =
        today.getMonth() + 1 < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1;
      var day =
        today.getDate() < 10 ? `0${today.getDate() + 1}` : today.getDate();
      var date = `${today.getFullYear()}-${month}-${day}`;

      const up = await fetch(
        `${process.env.REACT_APP_FETCH_MOVIE}primary_release_date.gte=${date}&sort_by=popularity.desc&include_adult=true`
      );
      const pop = await fetch(
        `${process.env.REACT_APP_FETCH_MOVIE}sort_by=popularity.desc&include_adult=true`
      );

      const top = await fetch(
        `${process.env.REACT_APP_FETCH_MOVIE}sort_by=vote_average.desc&year=2020&include_adult=true`
      );
      const h = await fetch(
        `${process.env.REACT_APP_FETCH_MOVIE}primary_release_year=2020&sort_by=vote_count.desc&include_adult=true`
      );

      const upcoming = await up.json();
      const popular = await pop.json();
      const top_rated = await top.json();
      const hot = await h.json();
      this.setState({
        top_rated: top_rated.results,
        upcoming: upcoming.results,
        popular: popular.results,
        hot: hot.results,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        statusCode: 404,
      });
    }
  }

  render() {
    const { statusCode, err, isLoading } = this.state;
    if (statusCode === 404) {
      console.log(err);

      return <Error statusCode={statusCode} />;
    }
    if (isLoading) {
      return <Loading />;
    }
    const { top_rated, upcoming, popular, hot } = this.state;
    console.log("df", hot);
    const mobile = this.state.mobile < 480 && "mobile";

    return (
      <div>
        <BackDropSlide mobile={mobile} />
        <Container>
          <div style={{ marginTop: "50px" }}>
            <List verticalAlign="bottom">
              <List.Item>
                <List.Content floated="right">
                  <Link to="/Hot">
                    <p>
                      See More <Icon name="angle right" />
                    </p>
                  </Link>
                </List.Content>
                <List.Content>
                  <h3>Hot</h3>
                  <Slides movies={hot} />
                </List.Content>
              </List.Item>
            </List>
          </div>
          <div style={{ marginTop: "50px" }}>
            <List verticalAlign="bottom">
              <List.Item>
                <List.Content floated="right">
                  <Link to="/Upcoming">
                    <p>
                      See More <Icon name="angle right" />
                    </p>
                  </Link>
                </List.Content>
                <List.Content>
                  <h3>Upcoming</h3>
                  <Slides movies={upcoming} />
                </List.Content>
              </List.Item>
            </List>
          </div>
        </Container>
        <div id="Random">
          <Random />
        </div>
        <Container>
          <div style={{ marginTop: "50px" }}>
            <List verticalAlign="bottom">
              <List.Item>
                <List.Content floated="right">
                  <Link to="/Popular">
                    <p>
                      See More <Icon name="angle right" />
                    </p>
                  </Link>
                </List.Content>
                <List.Content>
                  <h3>Popular</h3>
                  <Slides movies={popular} />
                </List.Content>
              </List.Item>
            </List>
          </div>
          <div style={{ marginTop: "50px" }}>
            <List verticalAlign="bottom">
              <List.Item>
                <List.Content floated="right">
                  <Link to="/Top_Rated">
                    <p>
                      See More <Icon name="angle right" />
                    </p>
                  </Link>
                </List.Content>
                <List.Content>
                  <h3>Top Rated</h3>
                  <Slides movies={top_rated} />
                </List.Content>
              </List.Item>
            </List>
          </div>
        </Container>
      </div>
    );
  }
}
