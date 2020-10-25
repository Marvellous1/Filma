import React, { Component } from "react";
import { Container, Grid, Segment, Button, Menu } from "semantic-ui-react";
import Movie from "../Constant/Movie";
import Error from "../Error";
import fetch from "isomorphic-unfetch";
import { genres } from "../Component/Genre";
import Loading from "../Constant/Loading/Loading";
import { Link } from "react-router-dom";

class SingleGenre extends Component {
  state = {
    page1results: "",
    page2results: "",
    statusCode: "",
    isLoading: true,
    activeItem: "",
  };

  componentDidMount() {
    this.getProps();
    this.setState({ activeItem: this.props.match.params });
  }

  componentDidUpdate(prevProps, Prevstate) {
    if (prevProps !== this.props) {
      this.getProps();
      this.setState({ activeItem: this.props.match.params });
    }
  }

  async getProps() {
    try {
      this.setState({ isLoading: true });
      const { id } = this.props.match.params;
      const page1 = await fetch(
        `${process.env.REACT_APP_FETCH_MOVIE}with_genres=${id}&primary_release_date.gte=2019-10-05&sort_by=release_date.desc,vote_average.desc&vote_count.gte=10&include_adult=true&page=1`
      );
      const page2 = await fetch(
        `${process.env.REACT_APP_FETCH_MOVIE}with_genres=${id}&primary_release_date.gte=2019-10-05&sort_by=release_date.desc,vote_average.desc&vote_count.gte=10&include_adult=true&page=2`
      );
      const page1results = await page1.json();
      const page2results = await page2.json();
      this.setState({
        page1results,
        page2results,
        statusCode: page1results.total_results === 0 ? 404 : 200,
        isLoading: false,
      });
    } catch {
      this.setState({
        statusCode: 404,
      });
    }
  }

  render() {
    const { statusCode, isLoading } = this.state;

    if (statusCode === 404) {
      return (
        <Error
          message="The Genre you are looking for no longer exists"
          statusCode={statusCode}
          suggestion={
            <div>
              <p>Browse through our other genres</p>
              <Link to="/Genre">
                <Button as="a" btn-purple href="/genre/12">
                  View Genre
                </Button>
              </Link>
            </div>
          }
        />
      );
    }
    if (isLoading) {
      return <Loading />;
    }
    const { page1results, page2results, activeItem } = this.state;

    const { id } = this.props.match.params;
    const movies = page1results.results.concat(page2results.results);

    const genre = genres.find((item) => `${item.id}` === id);
    return (
      <div className="py-3">
        <Grid container stretched>
          <Grid.Column width={4} only="tablet computer">
            <Menu fluid vertical tabular inverted>
              <Menu.Item name="All Genres" header className="genre-header" />
              {genres.map((genr) => {
                return (
                  <Menu.Item active={activeItem === `${genr.id}`} key={genr.id}>
                    <Link to={"/Genre/" + genr.id}>{genr.genre}</Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Grid.Column>
          <Grid.Column computer="12" tablet="12" mobile="16">
            <h3 className="" style={{ padding: "10px" }}>
              {genre.genre} Movies
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
        <style jsx>{`
          .genre-title {
            color: ${genre.color};
          }
        `}</style>
      </div>
    );
  }
}
export default SingleGenre;
