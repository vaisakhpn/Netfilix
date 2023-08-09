import React, { useContext } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import './Navbar.css';
import { AuthContext, FirebaseContext } from '../../Store/FirbaseContext';


const NavBar = () => {
  const location=useLocation()
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  const [isMobile, setIsMobile] = React.useState(false);

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };
  return (
    <>
    <Navbar expand="lg" className='navbar'>
      <Container>
        
        <Navbar.Brand>
          <Link to='/'><img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Logo" /></Link>
        </Navbar.Brand> 
        {!user&& location.pathname!== '/signin'&&( <Nav.Link  className="d-none d-lg-block justify-content-end"><Button variant='danger'><Link className='link' to='/signin'>Sign in</Link></Button></Nav.Link>)}
        {user&& location.pathname!== '/favourite' &&(<Nav.Link  className="d-none d-lg-block fbtn"><Button variant='link' className='fbtn2'><Link className='flink' to='/favourite'>Favourite</Link></Button></Nav.Link>)}
       {user && <NavDropdown className="d-none d-lg-block" title={user.displayName} id="basic-nav-dropdown">
             {user&& <NavDropdown.Item onClick={()=>{
          firebase.auth().signOut().then(()=>{
            navigate('/')
          })

        }} >Logout</NavDropdown.Item>}
              </NavDropdown>  }    
        <Navbar.Toggle aria-controls="navbar-nav" className="toggler" onClick={handleToggle} /> 
        
      </Container>
    </Navbar>
    </>
  );
}

export default NavBar;
