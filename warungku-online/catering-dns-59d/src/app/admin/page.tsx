"use client";

import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

export default function AdminLogin() {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title className="text-center">
                    Catering DNS 59D
                    <br />
                    <small className="text-muted">Admin Page</small>
                  </Card.Title>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="Username" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                  </FloatingLabel>

                  <div className="d-grid gap-2">
                    <Button variant="primary" className="mt-3">
                      Login
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
