import React, { useContext } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { useAppConfig } from 'contexts';

export function AppBar () {
  const appConfig = useAppConfig();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">{appConfig.name}</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
