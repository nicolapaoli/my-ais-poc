import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Title(props) {
    return (
        <Container>
            <Row className="mt-3">
                <h3>{props.title}</h3>
            </Row>
        </Container>
    )
}

export default Title;