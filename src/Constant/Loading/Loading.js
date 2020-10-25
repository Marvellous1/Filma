import React from "react";
import Lottie from "react-lottie";
import LoadingData from "./20184-loading-animation.json";

const Loading = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="loader-container">
      <div className="loader">
        <Lottie options={defaultOptions} height={180} width={180} />
        <h6 className="loader-text">Digging your data ...</h6>
      </div>
    </div>
  );
};

export default Loading;
