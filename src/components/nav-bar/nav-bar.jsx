import React from  'react';
import './nav-bar.scss'
import { Navbar, Nav, Container} from 'react-bootstrap'

import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (<Navbar bg="dark" variant="dark" expand="lg" fixed="top">
    <Container>
      <Navbar.Brand href="#home">myFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Register</Nav.Link>
          <Nav.Link href="#link">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    )
  }
}
