import React from "react";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h1 className="text-center">{props.name}</h1>
    </nav>
  );
};

export default Navbar;
