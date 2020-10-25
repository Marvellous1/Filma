import React, { Component } from "react";
import { Segment, Grid, Container, Menu } from "semantic-ui-react";
import Movie from "../Constant/Movie";
import { Link } from "react-router-dom";

export default class MyWatchlist extends Component {
  state = {
    watchlist: [],
  };
  componentDidMount() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    this.setState({
      watchlist,
    });
  }

  render() {
    const { watchlist } = this.state;
    return (
      <div className="py-3">
        <Grid container stretched>
          <Grid.Column width={4} only="tablet computer">
            <Menu fluid vertical tabular inverted>
              <Menu.Item name="Categories" header className="genre-header" />
              <Menu.Item>
                <Link to="/Hot">Hot</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/Upcoming">Upcoming</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/Top_Rated">Top Rated</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/Popular">Popular</Link>
              </Menu.Item>
              <Menu.Item name="Saved" header className="genre-header" />
              <Menu.Item>
                <Link to="/favourite">Favourite</Link>
              </Menu.Item>
              <Menu.Item active className="active-sidebar">
                <Link to="/MyWatchlist">Watchlist</Link>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column computer="12" tablet="12" mobile="16">
            <h3 className="" style={{ padding: "10px" }}>
              {watchlist === null
                ? "No movie in your watch list"
                : "My Watchlist"}
            </h3>
            <Grid>
              {watchlist != null &&
                watchlist.map((movie) => {
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
