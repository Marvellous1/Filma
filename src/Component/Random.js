import React, { Component } from "react";
import { Grid, Reveal, Image, Button, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import fetch from "isomorphic-unfetch";

export default class Random extends Component {
  state = {
    isLoading: false,
    isOpen: false,
    Movie: null,
  };

  handleGenerate = async () => {
    this.setState({
      isLoading: true,
      isOpen: false,
    });
    const Page = Math.floor(Math.random() * 20 + 1);
    const MovieIndex = Math.floor(Math.random() * 20 - 1);
    console.log(Page);
    const Json = await fetch(
      `${process.env.REACT_APP_FETCH_MOVIE}by=vote_average.desc&year=2020&include_adult=true&page=${Page}`
    );
    const PageQuery = await Json.json();
    const Movie = PageQuery.results[MovieIndex];
    this.setState({
      isLoading: false,
      Movie,
      isOpen: true,
    });
    console.log(PageQuery);
    console.log(Movie);
  };

  render() {
    const { Movie, isOpen, isLoading } = this.state;
    return (
      <div className="div black-bg" id="Random">
        <Grid centered container verticalAlign="middle" className="">
          <Grid.Column computer="8" tablet="8" mobile="16" textAlign="center">
            <Reveal animated="move right" active={isOpen}>
              <Reveal.Content visible>
                <Image src="/assets/Question.png" size="small" />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Link to={Movie !== null && "/Movie/" + Movie.id}>
                  <Image
                    src={
                      Movie === null
                        ? "/assets/Question.png"
                        : Movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${Movie.poster_path}`
                        : "/assets/Oops.png"
                    }
                    size="small"
                  />
                </Link>
              </Reveal.Content>
            </Reveal>
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <div className="text-wrapper">
              <h1 className="backdrop-title">
                GET A<span className="text-purple"> RANDOM </span> MOVIE
              </h1>
              <p>
                Don't know what movie to watch, let our smart generator give you
                a suggestion based on user preferences. CLick the generate
                button now to get your movie
              </p>
              <Button className="btn-purple" onClick={this.handleGenerate}>
                {isLoading ? (
                  <span>
                    <Loader active inline="centered" size="small" inverted />{" "}
                    Generating
                  </span>
                ) : (
                  "Generate Movie"
                )}
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
