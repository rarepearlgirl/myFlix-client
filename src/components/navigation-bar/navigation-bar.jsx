import './navigation-bar.css';
import "../main-view/main-view.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavigationBar = ({ user, onLogout }) => (
        <Navbar className="bg-custom" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand className="fs-3" as={Link} to="/">MovieMania</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="text-white fs-4">
                        {user ? (
                            <>
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );