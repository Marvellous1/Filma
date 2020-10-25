import React, { Component } from "react";
import { Segment, Grid, Container, Menu } from "semantic-ui-react";
import Movie from "../Constant/Movie";
import { Link } from "react-router-dom";

export default class favourite extends Component {
  state = {
    favourite: [],
  };
  componentDidMount() {
    const favourite = JSON.parse(localStorage.getItem("favourite"));
    this.setState({
      favourite,
    });
  }

  render() {
    const { favourite } = this.state;
    console.log("xx", favourite);
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
              <Menu.Item active className="active-sidebar">
                <Link to="/favourite">Favourite</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/MyWatchlist">Watchlist</Link>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column computer="12" tablet="12" mobile="16">
            <h3 className="" style={{ padding: "10px" }}>
              {favourite === null
                ? "No movie in your favourite list"
                : "My Favourite"}
            </h3>
            <Grid>
              {favourite !== null &&
                favourite.map((movie) => {
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
