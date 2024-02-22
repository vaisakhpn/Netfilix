import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import "./Navbar.css";

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg" className="navbar ">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
