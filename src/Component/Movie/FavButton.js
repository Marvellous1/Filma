import React, { Component } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

export default class FavButton extends Component {
  state = {
    favourite: [],
    inFavourite: false,
  };

  componentDidMount() {
    const { movie } = this.props;
    if (localStorage.getItem("favourite") !== null) {
      var favourite = JSON.parse(localStorage.getItem("favourite"));
      this.setState({ favourite });
      if (favourite.some((item) => item.id === movie.id)) {
        this.setState({
          inFavourite: true,
        });
      }
    }
  }

  handleAddToFavourite = () => {
    const { favourite, inFavourite } = this.state;
    const { movie } = this.props;

    if (!inFavourite) {
      favourite.push(movie);
      localStorage.setItem("favourite", JSON.stringify(favourite));
      this.setState({ inFavourite: true }, () => {});
    } else {
      const presentFavourite = favourite.filter(
        (items) => items.id !== movie.id
      );
      localStorage.setItem("favourite", JSON.stringify(presentFavourite));
      this.setState({ inFavourite: false }, () => {});
    }
  };
  render() {
    const { inFavourite } = this.state;
    return (
      <Label as="button" onClick={this.handleAddToFavourite}>
        <Icon color="red" name={inFavourite ? "heart" : "heart outline"} />{" "}
        Favourite
      </Label>
    );
  }
}
