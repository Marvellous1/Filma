import React, { Component } from "react";
import Slider from "react-slick";
import Movie from "../../Constant/Movie";

export default class Slides extends Component {
  render() {
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      swipeToSlide: true,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false,
          },
        },
      ],
    };

    return (
      <div>
        <Slider {...settings}>
          {this.props.movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </Slider>
      </div>
    );
  }
}
