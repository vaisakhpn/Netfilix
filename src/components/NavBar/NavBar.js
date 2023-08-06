import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-transparent">
      <Container>
        
        <Navbar.Brand>
          <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Logo" />
        </Navbar.Brand>       
        <Navbar.Toggle aria-controls="navbar-nav" className="toggler" />      
      </Container>
    </Navbar>
  );
}

export default NavBar;
