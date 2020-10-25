import React, { Component } from "react";
import {
  Container,
  Grid,
  Menu,
  Responsive,
  Visibility,
  Popup,
  Image,
} from "semantic-ui-react";

import Footer from "./Footer";
import { genres } from "../../Component/Genre";
import Search from "../../Component/Search/Search";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

class Desktop extends Component {
  state = {
    activeItem: "",
  };

  componentDidMount() {
    const pathName = this.props.location.pathname.split("/");
    this.setState({ activeItem: pathName[1] });
    console.log("a", this.state.activeItem);
  }

  componentDidUpdate(prevProps, Prevstate) {
    if (prevProps.location !== this.props.location) {
      const pathName = this.props.location.pathname.split("/");
      this.setState({ activeItem: pathName[1] });
      console.log("a", this.state.activeItem);
    }
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { children } = this.props;
    const { fixed, activeItem } = this.state;
    const getWidth = () => {
      const isSSR = typeof window === "undefined";

      return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
    };

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <MenuWrapper activeItem={activeItem}>
            <Menu
              fixed={fixed ? "top" : null}
              inverted={true}
              //  {     pointing={!fixed}}
              className="menu-bar"
              // secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item className="menu-item-wrapper">
                  <Link to="/">
                    <Image centered size="mini" src="/assets/logo.svg" />
                  </Link>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item className="menu-item-wrapper">
                    <Link
                      to="/"
                      className={`menu-item ${
                        activeItem === "" ? "active" : ""
                      }`}
                    >
                      Discover
                    </Link>
                  </Menu.Item>
                  <Menu.Item className="menu-item-wrapper">
                    <Link
                      to="/MyWatchlist"
                      className={`menu-item ${
                        activeItem === "MyWatchlist" ? "active" : ""
                      }`}
                    >
                      Watchlist
                    </Link>
                  </Menu.Item>
                  <Menu.Item className="menu-item-wrapper">
                    <Link
                      to="/favourite"
                      className={`menu-item ${
                        activeItem === "favourite" ? "active" : ""
                      }`}
                    >
                      Favourite
                    </Link>
                  </Menu.Item>
                  <Popup
                    trigger={
                      <Menu.Item className="menu-item-wrapper">
                        <Link
                          to="/Genre/28"
                          className={`menu-item ${
                            activeItem === "Genre" ? "active" : ""
                          }`}
                        >
                          Genre
                        </Link>
                      </Menu.Item>
                    }
                    flowing
                    hoverable
                    inverted
                  >
                    <Grid centered divided columns={4}>
                      {genres.map((genre) => {
                        return (
                          <Grid.Column textAlign="center">
                            <Link key={genre.id} to={`/Genre/${genre.id}`}>
                              {genre.genre}
                            </Link>
                          </Grid.Column>
                        );
                      })}
                      <Grid.Column textAlign="center">
                        <h5> - </h5>
                      </Grid.Column>
                    </Grid>
                  </Popup>
                  <Menu.Item className="menu-item-wrapper">
                    <Search />
                  </Menu.Item>
                </Menu.Menu>
              </Container>
            </Menu>
          </MenuWrapper>
        </Visibility>
        {children}
        <Footer />
      </Responsive>
    );
  }
}

export default withRouter(Desktop);

const MenuWrapper = styled.div`
  .menu-item-wrapper::before {
    width: 0px !important;
  }

  .menu-item:after {
    position: absolute;
    bottom: 1em;
    left: 1em;
    margin: auto;
    width: 0px;
    content: ".";
    transition: all 0.7s;
    color: transparent;
    background-color: #b084cc;
    height: 0px;
    border-radius: 5px;
  }

  .menu-item:hover:after,
  .menu-item.active::after {
    width: 10px;
    height: 10px;
  }

  .menu-bar {
    background-color: ${(props) =>
      props.activeItem === "" ? "#0f0f0f" : "#1b1c1d"} !important;
  }
`;
