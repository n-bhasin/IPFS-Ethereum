import React from "react";

const Footer = (props) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light text-center"
      style={{ textAlign: "center" }}
    >
      <h4 className="text-center">{props.name}</h4>
    </nav>
  );
};

export default Footer;
