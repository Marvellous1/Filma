import React, { Component } from "react";
import {
  Grid,
  Image,
  Button,
  Icon,
  Container,
  Embed,
  List,
} from "semantic-ui-react";
import Slides from "../Component/Slides/Slides";
import PersonSlide from "../Component/Slides/PersonSlide";
import fetch from "isomorphic-unfetch";
import Error from "../Error";
import FavButton from "../Component/Movie/FavButton";
import WatchButton from "../Component/Movie/WatchButton";
import Loading from "../Constant/Loading/Loading";
import Search from "../Component/Search/Search";

class MovieDetail extends Component {
  state = {
    isLoading: true,
    movie: "",
    mobile: null,
    trailerOpened: false,
  };
  componentDidMount() {
    this.getProps();
    const mobile = window.innerWidth;
    this.setState({ mobile, trailerOpened: false });
  }

  async getProps() {
    this.setState({ isLoading: true });
    const { id } = this.props.match.params;
    try {
      const rest = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,similar,credits`
      );
      const movie = await rest.json();

      this.setState({
        movie,
        statusCode: movie.status_code === 34 ? 404 : 200,
        isLoading: false,
      });
    } catch (error) {
      return {
        movie: {},
        statusCode: 404,
      };
    }
  }

  handleClick = () => {
    this.setState({
      trailerOpened: !this.state.trailerOpened,
    });
  };

  render() {
    const { statusCode, isLoading } = this.state;
    if (statusCode === 404) {
      return (
        <Error
          message="The Movie you are looking for no longer exists"
          statusCode={statusCode}
          suggestion={
            <div>
              <p>
                <b>
                  <strong>Search for another movie</strong>
                </b>
              </p>
              <Search />
            </div>
          }
        />
      );
    }
    if (isLoading) {
      return <Loading />;
    }
    const { movie } = this.state;
    const genre = movie.genres.map((genre) => (
      <span key={genre.id} className="text-purple">
        {" "}
        {genre.name} |{" "}
      </span>
    ));
    const director = movie.credits.crew.find(
      (person) => person.job === "Director"
    );
    const Screenplay = movie.credits.crew.find(
      (person) => person.job === "Screenplay"
    );
    const mobile = this.state.mobile < 480 ? this.state.mobile : null;
    const trailer = movie.videos.results[0];

    return (
      <div>
        <Container>
          <Grid>
            <Grid.Column mobile={16} tablet={16} computer={10}>
              <Embed
                id={trailer.key}
                placeholder={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                source="youtube"
                iframe={{
                  allowFullScreen: true,
                }}
              />
              <div className="py-3">
                <List verticalAlign="middle">
                  <List.Item>
                    <List.Content floated="right">
                      <a
                        href={"https://www.imdb.com/title/" + movie.imdb_id}
                        target="_blank"
                      >
                        <Icon color="yellow" link size="big" name="imdb" />
                      </a>
                      <a href={movie.homepage} target="_blank">
                        <Icon color="grey" size="big" name="globe" />
                      </a>
                    </List.Content>
                    <List.Content>
                      <h2>{movie.title}</h2>
                    </List.Content>
                  </List.Item>
                </List>

                <p className="tag_line">
                  <i>"{movie.tagline}"</i>
                </p>
                <p>
                  <strong>{genre}</strong>
                </p>
                <div>
                  <FavButton movie={movie} />
                  {"  "} <WatchButton movie={movie} />
                </div>
                <div className="py-3">
                  <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={5}>
                      <p>
                        Runtime :{" "}
                        <strong>
                          {movie.runtime > 120 ? 2 : 1}hr : {movie.runtime % 60}
                          mins
                        </strong>
                      </p>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={5}>
                      <p>
                        Directed By <strong> {director.name}</strong>
                      </p>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={5}>
                      <p>
                        Screenplay By <strong> {Screenplay.name}</strong>
                      </p>
                    </Grid.Column>
                  </Grid>
                </div>
                <p>{movie.overview}</p>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
              <div>
                <h3>Full Cast</h3>
                <PersonSlide people={movie.credits.cast} />
              </div>
              <div style={{ marginTop: "50px" }}>
                <h3>Full Crew</h3>
                <PersonSlide people={movie.credits.crew} />
              </div>
            </Grid.Column>
            <Grid.Column width={16}>
              <div>
                <h3>Related Movie</h3>
                <Slides movies={movie.similar.results} />
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <style jsx>{`
          .tag_line {
            font-style: italic;
            font-weight: normal;
            font-size: 15px;
            color: rgba(217, 217, 217, 0.5);
          }
        `}</style>
      </div>
    );
  }
}
export default MovieDetail;
