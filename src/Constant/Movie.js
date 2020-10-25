import React, { Component } from "react";
import { Image, Icon, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Movie extends Component {
  render() {
    const { movie } = this.props;
    return (
      <Link to={`/Movie/${movie.id}`}>
        <div className="movie-slides">
          <div>
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://unsplash.com/photos/R9OueKOtGGU/download"
              }
              className="single-movie"
            />
            <h4>{movie.original_title}</h4>
          </div>
          {
            // <List>
            //   <List.Item style={{ color: "white" }}>
            //     <List.Content floated="right">
            //       {movie.release_date.substring(0, 4)}
            //     </List.Content>
            //     <List.Content>
            //       <Icon name="star" color="yellow" />
            //       {movie.vote_average}
            //     </List.Content>
            //   </List.Item>
            // </List>
          }
        </div>
      </Link>
    );
  }
}
export default Movie;
