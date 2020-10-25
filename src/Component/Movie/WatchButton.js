import React, { Component } from "react";
import { Button, Label, Icon } from "semantic-ui-react";

export default class WatchButton extends Component {
  state = {
    watchlist: [],
    inWatchlist: false,
  };

  componentDidMount() {
    const { movie } = this.props;
    if (localStorage.getItem("watchlist") !== null) {
      var watchlist = JSON.parse(localStorage.getItem("watchlist"));
      this.setState({ watchlist });
      if (watchlist.some((item) => item.id === movie.id)) {
        this.setState({
          inWatchlist: true,
        });
      }
    }
  }

  handleAddToFavourite = () => {
    const { watchlist, inWatchlist } = this.state;
    const { movie } = this.props;

    if (!inWatchlist) {
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      this.setState({ inWatchlist: true }, () => {});
    } else {
      const presentWatchlist = watchlist.filter(
        (items) => items.id !== movie.id
      );
      localStorage.setItem("watchlist", JSON.stringify(presentWatchlist));
      this.setState({ inWatchlist: false }, () => {});
    }
  };
  render() {
    const { inWatchlist } = this.state;
    return (
      <Label
        as="button"
        onClick={this.handleAddToFavourite}
        color={inWatchlist ? "yellow" : "blue"}
      >
        <Icon name="list" />
        {inWatchlist ? "Remove From Watchlist" : "Add From Watchlist"}
      </Label>
    );
  }
}
