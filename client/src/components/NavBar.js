import React, { useState } from 'react';
import cred from '../img/cred.jpg';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import Login from './Login';
import Register from './Register';
const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="warning" light expand="md">
        <NavbarBrand style={{display:'flex'}}><img src={cred} className="logo"/><h1 style={{fontFamily: "'Monoton', cursive"}}>CRED</h1></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-left ml-auto" >
            <NavItem>
              <Login/>
            </NavItem>
            <NavItem>
              <Register/>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
