import React, { Component } from "react";
import {
  Container,
  Header,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Image,
} from "semantic-ui-react";
import Footer from "./Footer";
import Search from "../../Component/Search/Search";

import { genres } from "../../Component/Genre";
import { Link } from "react-router-dom";

class Mobile extends Component {
  state = {
    sidebarOpened: false,
    activeItem: "discover",
    showGenre: false,
  };

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, sidebarOpened: false });
  };
  handleToggle = () => this.setState({ sidebarOpened: true });

  toggleShow = () => {
    this.setState({ showGenre: !this.state.showGenre, sidebarOpened: true });
  };
  render() {
    const { children } = this.props;
    const { sidebarOpened, activeItem, showGenre } = this.state;
    const getWidth = () => {
      const isSSR = typeof window === "undefined";
      return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
    };
    const displayGenre = genres.slice(0, 4);

    const genreGroup = showGenre ? genres : displayGenre;
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item onClick={this.handleItemClick}>
            <Link to="/">
              <div style={{ textAlign: "center", justifyContent: "center" }}>
                <Image centered src="/assets/logo.svg" size="mini" />
                <p className="mobile-logo">Filma</p>
              </div>
            </Link>
          </Menu.Item>

          <Menu.Item
            name="discover"
            active={activeItem === "discover"}
            onClick={this.handleItemClick}
          >
            <Link to="/">
              <p
                style={{ color: activeItem === "discover" ? "grey" : "white" }}
              >
                <span style={{ marginRight: "8px" }}>
                  <Icon name="video" />
                </span>
                Discover
              </p>
            </Link>
          </Menu.Item>
          <Menu.Item
            name="watchlist"
            active={activeItem === "watchlist"}
            onClick={this.handleItemClick}
          >
            <Link to="/MyWatchlist">
              <p
                style={{ color: activeItem === "watchlist" ? "grey" : "white" }}
              >
                <span style={{ marginRight: "8px" }}>
                  <Icon name="list alternate" />
                </span>
                My Watchlist
              </p>
            </Link>
          </Menu.Item>
          <Menu.Item
            name="favourite"
            active={activeItem === "favourite"}
            onClick={this.handleItemClick}
          >
            <Link to="/favourite">
              <p
                style={{ color: activeItem === "favourite" ? "grey" : "white" }}
              >
                <span style={{ marginRight: "8px" }}>
                  <Icon name="heart" />
                </span>
                Favourite
              </p>
            </Link>
          </Menu.Item>

          <List as={Menu.Item} className="Genre_List">
            <List.Item onClick={this.handleItemClick}>
              <Link to="/Genre">
                <p style={{ color: activeItem === "genre" ? "grey" : "white" }}>
                  <span style={{ marginRight: "8px" }}>
                    <Icon name="circle" />
                  </span>
                  Genre
                </p>
              </Link>
              {genreGroup.map((genre) => {
                const genrename = genre.genre;
                return (
                  <List.Item key={genre.id} className="ml-3">
                    <Link to={"/genre/" + genre.id}>
                      <p
                        style={{
                          color:
                            activeItem === { genrename } ? "grey" : "white",
                        }}
                      >
                        {genre.genre}
                      </p>
                    </Link>
                  </List.Item>
                );
              })}
            </List.Item>
          </List>
          <Menu.Item onClick={this.toggleShow}>
            <p style={{ textAlign: "right" }}>
              {showGenre ? "See Less.." : " See All..."}
            </p>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            vertical
            // style={{ minHeight: 5, padding: "0em 0em" }}
          >
            <Container>
              <Menu inverted pointing secondary>
                <Menu.Item>
                  <div>
                    <Icon onClick={this.handleToggle} name="sidebar" />
                  </div>
                  <Link to="/">
                    <Image src="/assets/logo.svg" size="mini" />
                  </Link>
                </Menu.Item>
                <Menu.Item position="right">
                  <Search mobile />
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
          {children}
          <Footer />
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}
export default Mobile;
