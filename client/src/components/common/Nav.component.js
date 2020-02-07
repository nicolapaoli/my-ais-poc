import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function MyNav() {
    const access_token = localStorage.getItem('access_token');

    let items = "";
    if (access_token) {
        items =
            <Nav className="mr-auto">
                <Nav.Link href="/accounts">Accounts</Nav.Link>
                <Nav.Link href="/transactions">Transactions</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>;
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Nic AIS</Navbar.Brand>
                {items}
            </Container>
        </Navbar>
    );
}

export default MyNav;