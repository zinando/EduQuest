import { Navbar, Nav, NavDropdown, Form, FormControl, InputGroup } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Form inline>
            <InputGroup>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <InputGroup.Append>
                <InputGroup.Text>🔍</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <Nav.Link href="#notifications">🔔</Nav.Link>
          <NavDropdown title="User Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
