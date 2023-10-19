import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Image = (props) => {
    const { imgSrc } = props

  const LogoStyles = {
    position: 'relative',
    top: '0px',
    width: '45%',
    height: 'auto',
  };

  return (
    <Container fluid="xl" className="text-center">
      <Row>
        <Col md className="mx-auto">
          <img style={LogoStyles} src={imgSrc} />
        </Col>
      </Row>
    </Container>
  );
};

export default Image;
