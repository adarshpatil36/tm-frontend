import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { userLogout } from "../../api/userApi";

export const Header = ({user}) => {
  const history = useHistory();

  const logMeOut = () => {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("crmSite");
    userLogout();
    history.push("/");
  };
  const renderUser = () => {
      return (<LinkContainer to="/">
            <Nav.Link className="user-role">
      {user.role}:</Nav.Link>
          </LinkContainer>)
  };

  return (
    <Navbar collapseOnSelect className="bck" variant="dark" expand="md">
      <Navbar.Brand>
        <img src={logo} alt="logo" width="60px" style={{borderRadius: "50%"}}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {renderUser()}
          <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/tickets">
            <Nav.Link>Tickets</Nav.Link>
          </LinkContainer>

          <Nav.Link onClick={logMeOut}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
