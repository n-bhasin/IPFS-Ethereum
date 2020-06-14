import React from "react";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <p className="text-center">{props.name}</p>
    </nav>
  );
};

export default Navbar;
