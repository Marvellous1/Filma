import React, { Component } from "react";
import Slider from "react-slick";
import { Image, Grid, Container, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default class BackDropSlide extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      focusOnSelect: true,
      arrows: false,
      pauseOnHover: false,
      autoplay: true,
      autoplayspeed: 4000,
      speed: 4000,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
      ],
    };

    const movielist = [
      {
        id: 38700,
        overview:
          "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
        backdrop_path: "/upUy2QhMZEmtypPW3PdieKLAHxh.jpg",
        original_title: "Bad Boys For Life",
        tagline: "Ride together. Die together.",
      },
      {
        id: 545609,
        overview:
          "Tyler Rake, a fearless mercenary who offers his services on the black market, embarks on a dangerous mission when he is hired to rescue the kidnapped son of a Mumbai crime lord…",
        backdrop_path: "/1R6cvRtZgsYCkh8UFuWFN33xBP4.jpg",
        original_title: "Extraction",
        tagline: "When the mission ends, redemption begins",
      },
      {
        id: 338762,
        overview:
          "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
        backdrop_path: "/ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
        original_title: "Bloodshot",
        tagline: "Being a superhero is in his blood",
      },
      {
        id: 454626,
        overview:
          "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
        backdrop_path: "/stmYfCUGd8Iy6kAMBr6AmWqx8Bq.jpg",
        original_title: "Sonic the Hedgehog",
        tagline: "A Whole New Speed of Hero",
      },
    ];

    const mobile = window.innerWidth < 480;

    return (
      <div>
        <Slider {...settings}>
          {movielist.map((movie) => {
            return (
              <BackdropContainer mobile movie={movie}>
                <div key={movie.id} className="backdrop">
                  <div className="backdrop-wrapper">
                    <Grid
                      centered
                      container
                      verticalAlign="middle"
                      reversed="mobile vertically"
                    >
                      <Grid.Column
                        computer="8"
                        tablet="8"
                        mobile="16"
                        textAlign={mobile ? "center" : "left"}
                      >
                        <div className="text-wrapper">
                          <h1 className="backdrop-title">
                            {movie.original_title}
                          </h1>
                          <p className="tagline">
                            <i>"{movie.tagline}"</i>
                          </p>
                          <p>{movie.overview}</p>
                          <Button className="btn-purple">
                            <Link to={`/Movie/${movie.id}`}>View Movie</Link>
                          </Button>
                        </div>
                      </Grid.Column>
                      <Grid.Column computer="8" tablet="8" mobile="16">
                        <Link to={`/Movie/${movie.id}`}>
                          <div className="image-wrapper">
                            <Image
                              src={
                                "https://image.tmdb.org/t/p/w500" +
                                movie.backdrop_path
                              }
                            />
                            <Icon name="play circle outline play-icon"></Icon>
                          </div>
                        </Link>
                      </Grid.Column>
                    </Grid>
                  </div>
                </div>
              </BackdropContainer>
            );
          })}
        </Slider>
      </div>
    );
  }
}
const BackdropContainer = styled.div`
        .backdrop {
          background: #0F0F0F;
          background: linear-gradient(
            127.33deg, 
            #0F0F0F 39.54%, 
            rgba(28, 16, 16, 0.88) 101.75%
            ),  url(https://image.tmdb.org/t/p/w500/${(props) =>
              props.movie.backdrop_path})
              center center;
          background-size: cover;
          min-height: ${(props) => (props.mobile ? "80vh" : "80vh")};
          background-repeat: ${(props) =>
            props.mobile ? "no-repeat" : "no-repeat"};

        }
  
        .backdrop-title {
          text-transform: uppercase;
          line-height: 40px;
        }

        .backdrop-wrapper {
            display : flex;
            align-items: center;
            height: 90vh
        }

        .image-wrapper {
          position: relative;
        }
        .tagline {
          font-size: 13px;
          font-weight: 300
          padding-bottom : ${(props) => (props.mobile ? "20px" : "2px")}
        }
        .play-icon {
          font-size: 50px;
          color: #b084cc;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
    }`;
