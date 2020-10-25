import React, { Component } from "react";
import { Container, Grid, Segment, Menu } from "semantic-ui-react";
import Movie from "../Constant/Movie";
import Error from "../Error";
import fetch from "isomorphic-unfetch";
import Loading from "../Constant/Loading/Loading";
import { Link } from "react-router-dom";

class Others extends Component {
  state = {
    statusCode: "",
    page1results: "",
    page2results: "",
    tagline: "",
    isLoading: true,
  };
  componentDidMount() {
    this.getProps();
  }

  componentDidUpdate(prevProps, Prevstate) {
    if (prevProps !== this.props) {
      this.getProps();
    }
  }
  async getProps() {
    try {
      this.setState({ isLoading: true });
      const query = this.props.match.params.link;
      console.log("nmm", this.props);
      if (query === "Upcoming") {
        var today = new Date();
        var month =
          today.getMonth() + 1 < 10
            ? `0${today.getMonth() + 1}`
            : today.getMonth() + 1;
        var day =
          today.getDate() < 10 ? `0${today.getDate() + 1}` : today.getDate();
        var date = `${today.getFullYear()}-${month}-${day}`;
        const page1 = await fetch(
          `${process.env.REACT_APP_FETCH_MOVIE}primary_release_date.gte=${date}&sort_by=popularity.desc&include_adult=true&page=1`
        );
        const page2 = await fetch(
          `${process.env.REACT_APP_FETCH_MOVIE}primary_release_date.gte=${date}&sort_by=popularity.desc&include_adult=true&page=2`
        );
        const page1results = await page1.json();
        const page2results = await page2.json();
        this.setState({
          page1results,
          page2results,
          tagline: "Find Movies that are about to released",
          statusCode: page1results.total_results === 0 ? 404 : 200,
          isLoading: false,
        });
      } else if (query === "Popular") {
        const page1 = await fetch(
          `${process.env.REACT_APP_FETCH_MOVIE}sort_by=popularity.desc&include_adult=true&page=1`
        );
        const page2 = await fetch(
          `${process.env.REACT_APP_FETCH_MOVIE}sort_by=popularity.desc&include_adult=true&page=2`
        );
        const page1results = await page1.json();
        const page2results = await page2.json();
        this.setState({
          page1results,
          page2results,
          tagline: "View the most popular movies according to users",
          statusCode: page1results.total_results === 0 ? 404 : 200,
          isLoading: false,
        });
      } else if (query === "Top_Rated") {
        const page1 = await fetch(
          `${process.env.REACT_APP_FETCH_MOVIE}by=vote_average.desc&year=2020&include_adult=true&page=1`
        );
        const page2 = await fetch(
          `${process.env.REACT_APP_FETCH_MOVIE}by=vote_average.desc&year=2020&include_adult=true&page=2`
        );
        const page1results = await page1.json();
        const page2results = await page2.json();
        this.setState({
          page1results,
          page2results,
          tagline: "Check out the movies with the highest user ratings",
          statusCode: page1results.total_results === 0 ? 404 : 200,
          isLoading: false,
        });
      } else if (query === "Hot") {
        const page1 = await fetch(
          `${process.env.REACT_APP_FETCH_MOVIE}primary_release_year=2020&sort_by=vote_count.desc&include_adult=true&page=1`
        );
        const page2 = await fetch(
          `${process.env.REACT_APP_FETCH_MOVIE}primary_release_year=2020&sort_by=vote_count.desc&include_adult=true&page=2`
        );
        const page1results = await page1.json();
        const page2results = await page2.json();
        this.setState({
          page1results,
          page2results,
          tagline: "Find the hottest movies of today",
          statusCode: page1results.total_results === 0 ? 404 : 200,
          isLoading: false,
        });
      } else {
        this.setState({
          movie: {},
          statusCode: 404,
        });
      }
    } catch (error) {
      console.log("nn", error);
      this.setState({
        movie: {},
        statusCode: 404,
      });
    }
  }

  render() {
    const { statusCode, isLoading } = this.state;
    const links = [
      {
        Title: "Hot",
        Link: "Hot",
      },
      {
        Title: "Upcoming",
        Link: "Upcoming",
      },
      {
        Title: "Top Rated",
        Link: "Top_Rated",
      },
      {
        Title: "Popular",
        Link: "Popular",
      },
    ];
    if (statusCode === 404) {
      return <Error statusCode={statusCode} />;
    }
    if (isLoading) {
      return <Loading />;
    }
    const { page1results, page2results, router, tagline } = this.state;
    const movies = page1results.results.concat(page2results.results);
    const PageTitle = this.props.match.params.link;
    return (
      <div className="py-3">
        <Grid container stretched>
          <Grid.Column width={4} only="tablet computer">
            <Menu fluid vertical tabular inverted>
              <Menu.Item name="Categories" header className="genre-header" />
              {links.map((link) => {
                return (
                  <Menu.Item
                    active={PageTitle === link.Link ? true : false}
                    className={PageTitle === link.Link ? "active-sidebar" : ""}
                  >
                    <Link to={`/${link.Link}`}>{link.Title}</Link>
                  </Menu.Item>
                );
              })}
              <Menu.Item name="Saved" header className="genre-header" />
              <Menu.Item>
                <Link to="/favourite">Favourite</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/MyWatchlist">Watchlist</Link>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column computer="12" tablet="12" mobile="16">
            <h3 className="" style={{ padding: "10px" }}>
              {PageTitle} Movies
            </h3>
            <Grid>
              {movies.map((movie) => {
                return (
                  <Grid.Column tablet="4" computer="4" mobile="8">
                    <Movie movie={movie} />
                  </Grid.Column>
                );
              })}
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default Others;
