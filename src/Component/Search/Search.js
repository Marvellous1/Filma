import React, { Component } from "react";
import {
  Input,
  Icon,
  Dropdown,
  Search,
  Image,
  List,
  Item,
} from "semantic-ui-react";
import fetch from "isomorphic-unfetch";
import SearchItems from "./SearchItems";
import { Link } from "react-router-dom";

export default class Main extends Component {
  state = {
    query: "",
    isFetching: false,
    movies: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchItem();
    }
  }

  async fetchItem() {
    if (this.state.query.length > 1) {
      this.setState({ isFetching: true });
      const query = this.state.query;
      const queriesJson = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=17a6e7ef85bf2575bd5c2e1558d34138&query=${query}`
      );
      // const queriesJson = await fetch(
      //   `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
      // );
      const queries = await queriesJson.json();
      const movies = queries.results.slice(0, 5);
      this.setState({
        isFetching: false,
        movies,
      });
    }
  }

  handleResultRender = (movie) => {
    return (
      <Link key={movie.id} to={`/Movie/${movie.id}`}>
        <Item>
          <Item.Image
            size="big"
            className="search-img"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path} `
                : "https://unsplash.com/photos/R9OueKOtGGU/download"
            }
          />

          <Item.Content className="search-content">
            <Item.Header as="a" className="search-header">
              {movie.original_title.length > 18
                ? `${movie.original_title.substring(0, 18)}...`
                : movie.original_title}
            </Item.Header>
            <Item.Description className="search-desc">
              ({movie.release_date.substring(0, 4)})
            </Item.Description>
          </Item.Content>
        </Item>
      </Link>
    );
  };

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };
  clearSearch = (e) => {
    this.setState({
      query: "",
    });
  };

  render() {
    const { isFetching, query, movies } = this.state;
    const { mobile } = this.props;


    return (
      <div>
        <Search
          loading={isFetching}
          // open
          // onResultSelect={this.handleResultSelect}
          resultRenderer={this.handleResultRender}
          onSearchChange={this.handleChange}
          results={movies}
          value={query}
        />
        {
          //      <Dropdown
          //   placeholder="Select Country"
          //   fluid
          //   search
          //   selection
          //   options={countryOptions}
          // />
          // <Input
          //   className="mobile-search"
          //   loading={isFetching}
          //   type="text"
          //   placeholder="Search Movie"
          //   icon={
          //     <Icon
          //       color="black"
          //       link
          //       name={query.length > 0 ? "cancel" : "search"}
          //       onClick={this.clearSearch}
          //     />
          //   }
          //   onChange={this.handleChange}
          // />
          // <SearchItems query={query} movies={movies} />
        }

        <style jsx>{`
          .search-content {
            padding: 0;
            margin: 0 !important;
            margin-left: -50px;
            color: #000;
          }
          ,
          .search-header {
            color: #000;
          }
          ,
          .search-desc {
            color: #000;
          }
        `}</style>
      </div>
    );
  }
}
