import React, { Component } from "react";
import { Segment, List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class SearchItems extends Component {
  render() {
    const { movies, query } = this.props;
    if (query.length < 2) {
      return null;
    } else
      return (
        <div className="search-list">
          <Segment>
            <List selection verticalAlign="middle">
              {movies.map((movie) => {
                return (
                  <Link key={movie.id} to={`/Movie/${movie.id}`}>
                    <List.Item>
                      <Image
                        floated="left"
                        size="mini"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path} `
                            : "https://unsplash.com/photos/R9OueKOtGGU/download"
                        }
                      />
                      <List.Content>
                        <List.Header>
                          {movie.original_title.length > 18
                            ? `${movie.original_title.substring(0, 18)}...`
                            : movie.original_title}
                        </List.Header>
                        <List.Description>
                          ({movie.release_date.substring(0, 4)})
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </Link>
                );
              })}
            </List>
          </Segment>
        </div>
      );
  }
}
