import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import './styles.css';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="logo512.png"
                        alt="logo"
                        className="logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/"><i className="fas fa-book icon"></i><b>&nbsp;Posts</b></Nav.Link>
                        <Nav.Link href="/photos"><i className="fas fa-camera-retro icon"></i><b>&nbsp;Photos</b></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;