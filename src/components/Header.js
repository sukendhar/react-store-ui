import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    REEF Dashboard
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Log In
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Sign Up
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link disabled>
                                    {user.email}
                                </Nav.Link>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={logout}
                                    className="ms-2"
                                >
                                    Log Out
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}