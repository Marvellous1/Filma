import React, { Component } from "react";
import BackDropSlide from "./Component/Slides/BackDropSlide";

import Random from "./Component/Random";
import { Grid, Icon, Container, Form, Radio, Button } from "semantic-ui-react";

export default class Demo extends Component {
  state = {
    isLoading: false,
    isOpen: false,
    value: null,
    Movie: null,
  };

  StartGame = async () => {
    this.setState({
      isLoading: true,
      isOpen: false,
    });
    const Page = Math.floor(Math.random() * 20 + 1);
    const MovieIndex = Math.floor(Math.random() * 20 - 1);
    console.log(Page);
    const Json = await fetch(
      `${process.env.REACT_APP_FETCH_MOVIE}sort_by=popularity.desc&include_adult=true&page=${Page}`
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

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { Movie } = this.state;
    return (
      <Container className="py-3">
        <Button className="btn-purple" onClick={this.StartGame}>
          Start Game
        </Button>
        <Grid columns="3">
          <Grid.Column>
            <Icon circular size="big" className="btn-purple" name="refresh" />
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h1>PLAY TRIVIA</h1>
            <h3>Level 4</h3>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Icon circular size="big" className="btn-purple">
              1
            </Icon>
          </Grid.Column>
        </Grid>
        <Grid divided stackable columns="2">
          <Grid.Column>
            <h3>Guess The Movie ??</h3>
            <p>
              <strong>Year - </strong>
              {Movie.release_date.substring(0, 4)}
            </p>
            <p>
              <strong>Overview </strong>
              <br />
              {Movie.overview}
            </p>
          </Grid.Column>
          <Grid.Column>
            <Form inverted>
              <Form.Field as="h3">
                Selected value: <b>{this.state.value}</b>
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Choose this"
                  name="radioGroup"
                  value="this"
                  as="h5"
                  className="options"
                  checked={this.state.value === "this"}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Or that"
                  name="radioGroup"
                  value="that"
                  checked={this.state.value === "that"}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
