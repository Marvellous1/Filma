import React from "react";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

const Layout = (props) => {
  return (
    <div className="main">
      <Desktop>{props.children}</Desktop>
      <Mobile>{props.children}</Mobile>
    </div>
  );
};

export default Layout;
