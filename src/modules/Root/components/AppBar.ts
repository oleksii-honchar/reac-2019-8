import React, { useContext } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { AppCfgContext } from 'contexts/AppCfgContext';

export function AppBar () {
  const appCfgCtx = useContext(AppCfgContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">{appCfgCtx.name}</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
