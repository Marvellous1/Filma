import React, { Component } from "react";
import { Button, Embed, Container } from "semantic-ui-react";
import styled from "styled-components";

export default class Trailer extends Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    console.log("s", this.props.mobile);

    this.setState({
      isOpen: this.props.trailerOpened,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.trailerOpened !== prevProps.trailerOpened) {
      this.setState({
        isOpen: this.props.trailerOpened,
      });
    }
  }

  handleClick = () => {
    this.setState({
      isOpen: false,
    });
  };
  render() {
    if (this.state.isOpen === false) {
      return null;
    } else {
      const { mobile, placeholder, trailer } = this.props;

      return (
        <TrailerWapper mobile={mobile}>
          <div className="trailer-wrapper">
            <div className="trailer">
              <Container>
                <Embed
                  id={trailer.key}
                  placeholder={placeholder}
                  source="youtube"
                  autoplay
                  iframe={{
                    allowFullScreen: true,
                  }}
                />
                <Button
                  color="red"
                  className="close-button"
                  onClick={this.handleClick}
                >
                  Close
                </Button>
              </Container>
            </div>
          </div>
        </TrailerWapper>
      );
    }
  }
}

const TrailerWapper = styled.div`
  .trailer-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: rgba(27, 28, 29, 0.9);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }
  .trailer {
    width: ${(props) => (props.mobile ? `${props.mobile}px` : `853px`)};
    height: ${(props) => (props.mobile ? `315px` : `505px`)};
    margin: 10px;
  }
  .close-button {
    margin: 20px;
  }
`;
