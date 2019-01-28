import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Jumbotron, Button } from "reactstrap";
import { Link } from 'react-router-dom';

const InvalidSearch = () => {
  return (
    <Container>
      <Row className="mt-3">
        <Col xs="12">
          <Jumbotron className="jumboError">
            <h3 className="display-5">The requested Movie/Series not found</h3>
            <p className="lead">
              No data found on the requested URL.
            </p>
            <hr className="my-2" />
            <p className="lead mx-auto">
            <Link to="/"><Button color="danger">Go to Homepage</Button></Link>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default InvalidSearch;
