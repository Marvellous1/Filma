import React from "react";
import {
  Container,
  Divider,
  Image,
  List,
  Segment,
  Grid,
  Header,
} from "semantic-ui-react";
import Rate from "./Rate";
import { Link } from "react-router-dom";
// import { HashLink as Link } from "react-router-hash-link";

const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container>
        <Grid inverted stackable>
          <Grid.Row>
            <Grid.Column width={7}>
              <Header as="h3" inverted>
                FILMA
              </Header>
              <div className="my-5">
                <Image size="mini" src="/assets/logo.svg" />
              </div>{" "}
              <br />
              <p>
                Filma is a fun project developed by{" "}
                <a
                  href="https://twitter.com/vello_codes"
                  className="text-purple"
                >
                  Vello
                </a>{" "}
                to give users a fun experience while querying and viewing
                information about their favourite movies. We also Update Our
                Movie list on a regular basis. Enjoy Filma
              </p>
            </Grid.Column>

            <Grid.Column width={3}>
              <Header inverted as="h3" content="CATEGORIES" />
              <List link inverted className="my-5">
                <List.Item as="p">
                  <Link to="/Upcoming">Upcoming</Link>
                </List.Item>
                <List.Item as="p">
                  <Link to="/Popular">Popular</Link>
                </List.Item>
                <List.Item as="p">
                  <Link to="/Hot">Hot</Link>
                </List.Item>
                <List.Item as="p">
                  <Link to="/Top_Rated">Top Rated</Link>
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column width={3}>
              <Header inverted as="h3" content="FEATURES" />
              <List link inverted className="my-5">
                <List.Item as="p">
                  <Link to="/MyWatchlist">Watchlist</Link>
                </List.Item>
                <List.Item as="p">
                  <Link to="/Favourite">Favourite</Link>
                </List.Item>
                <List.Item as="p">
                  <Link to="/#Random">Random Movie</Link>
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column width={3}>
              <Header inverted as="h3" content="TOP GENRE" />
              <List link inverted className="my-5">
                <List.Item as="p">
                  <Link to="/Genre/12">Adventue</Link>
                </List.Item>
                <List.Item as="p">
                  <Link to="/Genre/27">Horror</Link>
                </List.Item>
                <List.Item as="p">
                  <Link to="/Genre/28">Action</Link>
                </List.Item>
                <List.Item as="p">
                  <Link to="/Genre/35">Comedy</Link>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <p style={{ color: "grey" }}>
                © 2020, Filma. All Rights reserved
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
