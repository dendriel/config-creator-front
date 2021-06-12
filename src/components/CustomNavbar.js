// Core Components

import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
// import {Dropdown} from "bootstrap";


export default function CustomNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/link">Link</Nav.Link>

                    {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                    {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Divider />*/}
                    {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                    {/*</NavDropdown>*/}

                    <NavDropdown title="Resources" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/directory">Directory</NavDropdown.Item>
                        <NavDropdown.Item href="/resources">Resources</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
                {/*<Form inline>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                {/*    <Button variant="outline-success">Search</Button>*/}
                {/*</Form>*/}
            </Navbar.Collapse>
        </Navbar>
    )
}
