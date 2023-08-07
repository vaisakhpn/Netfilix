import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Navbar.css';

const NavBar = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };
  return (
    <Navbar expand="lg" className='navbar'>
      <Container>
        
        <Navbar.Brand>
          <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Logo" />
        </Navbar.Brand> 
        <Nav.Link href="/signin" className="d-none d-lg-block"><Button variant='danger'>Sign In</Button></Nav.Link>      
        <Navbar.Toggle aria-controls="navbar-nav" className="toggler" onClick={handleToggle} /> 
      </Container>
    </Navbar>
  );
}

export default NavBar;
