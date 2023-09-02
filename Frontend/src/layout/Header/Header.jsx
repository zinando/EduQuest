import './Header.css'
import Navbar from 'react-bootstrap/Navbar';
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


export default function Header() {
  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Brand</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>{' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>;
    </div>
  )
}