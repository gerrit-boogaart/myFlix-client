import React from  'react';
import './nav-bar.scss'
import { Navbar, Nav, Container, Button} from 'react-bootstrap'


export function Navbar({user}) {

     const onLoggedOut = () => {
      localStorage.clear();
      window.open('/', '_self');
     }

     const isAuth = () => {
      if (typeof window == "undefined") {
        return false;
      }
      if (localStorage.getItem('token')){
        return localStorage.getItem('token');
      } else {
        return false;
      }
    };
      
      return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">myFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAuth() && (
                <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
              )}
              {isAuth() && (
                  <Button variant="link" onClick={()=> { this.onLoggedOut() }}>Logout</Button>
              )}
              {!isAuth() && (
                <Nav.Link href="/">Sign-in</Nav.Link>
              )}
              {!isAuth() && (
                <Nav.Link href="/register">Sign-Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
      
}
