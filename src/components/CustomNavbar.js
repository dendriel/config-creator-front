import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useAuth} from "../contexts/authentication-provider";
import {useHistory} from "react-router";


export default function CustomNavbar() {
    const {isAuthenticated} = useAuth()
    const history = useHistory()

    if (!isAuthenticated()) {
        return null
    }

    const logout = () => {
        history.push("/logout")
    }

    return (
        <Navbar bg="light" expand="lg">
            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {/*<Nav.Link href="/link">Link</Nav.Link>*/}

                    <NavDropdown title="Project" id="basic-nav-dropdown">
                        {/*<NavDropdown.ItemText><b><i>Project</i></b></NavDropdown.ItemText>*/}
                        <NavDropdown.Item href="/project">List</NavDropdown.Item>
                        <NavDropdown.Item href="/project/create">Create</NavDropdown.Item>
                        {/*<NavDropdown.Divider />*/}
                        <NavDropdown.Item href="/resource">Resource</NavDropdown.Item>
                        <NavDropdown.Item href="/configuration">Configuration</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Templates" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/template">List</NavDropdown.Item>
                        <NavDropdown.Item href="/template/create">Create</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Media" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/directory">Directory</NavDropdown.Item>
                        <NavDropdown.Item href="/resources">Resources</NavDropdown.Item>
                    </NavDropdown>

                </Nav>

                <Nav>
                    <Button variant="outline-warning" onClick={logout}>
                        Logout
                    </Button>
                    {/*<button className={`btn btn-outline-danger`} disabled onClick={() => props.removeDir(dir.id)}>*/}
                    {/*    Remove*/}
                    {/*</button>*/}
                </Nav>
                {/*<Form inline>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                {/*    <Button variant="outline-success">Search</Button>*/}
                {/*</Form>*/}
            </Navbar.Collapse>
        </Navbar>
    )
}
