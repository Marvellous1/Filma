import React, { Component } from "react";
import Slider from "react-slick";
import { Image } from "semantic-ui-react";

export default class PersonSlide extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      swipeToSlide: true,
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.people.map((person) => {
            var profilepics = "";
            if (!person.profile_path) {
              if (person.gender === 1) {
                profilepics =
                  "https://unsplash.com/photos/R9OueKOtGGU/download";
              } else {
                profilepics =
                  "https://unsplash.com/photos/R9OueKOtGGU/download";
              }
            } else {
              profilepics = `https://image.tmdb.org/t/p/w500/${person.profile_path}`;
            }

            return (
              <div className="person-detail">
                <Image src={profilepics} />
                <p className="person-name">{person.name}</p>
                <br />
                <span className="person-title">
                  {person.character ? person.character : person.job}
                </span>
              </div>
            );
          })}
        </Slider>
        <style jsx>{`
          .person-detail {
            text-align: center;
            padding: 10px;
          }
          .person-name {
            font-weight: 500;
            font-size: 15px;
            line-height: 0px;
            margin-top: 20px;
          }
          .person-title {
            font-weight: normal;
            font-size: 12px;
            line-height: 5px;
            color: #fff;
          }
        `}</style>
      </div>
    );
  }
}
