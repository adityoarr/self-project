"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Tabs,
  Tab,
  ListGroup,
  Image,
  Button,
} from "react-bootstrap";
import { InfoCircle, Images, Plus } from "react-bootstrap-icons";

export default function Home() {
  const [menuTab, setMenuTab] = useState("makanan");

  const infoClicked = () => {
    alert("info");
  };
  const itemClicked = () => {
    alert("item");
  };
  const noImage = (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M7.828 5l-1-1H22v15.172l-1-1v-.69l-3.116-3.117-.395.296-.714-.714.854-.64a.503.503 0 0 1 .657.046L21 16.067V5zM3 20v-.519l2.947-2.947a1.506 1.506 0 0 0 .677.163 1.403 1.403 0 0 0 .997-.415l2.916-2.916-.706-.707-2.916 2.916a.474.474 0 0 1-.678-.048.503.503 0 0 0-.704.007L3 18.067V5.828l-1-1V21h16.172l-1-1zM17 8.5A1.5 1.5 0 1 1 15.5 7 1.5 1.5 0 0 1 17 8.5zm-1 0a.5.5 0 1 0-.5.5.5.5 0 0 0 .5-.5zm5.646 13.854l.707-.707-20-20-.707.707z"></path>
        <path fill="none" d="M0 0h24v24H0z"></path>
      </g>
    </svg>
  );

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home" className="mx-auto">
            59D Stall
          </Navbar.Brand>
          <InfoCircle size={20} color="white" onClick={infoClicked} />
        </Container>
      </Navbar>

      <main>
        <Container>
          <Tabs
            id="controlled-tab-menu"
            activeKey={menuTab}
            onSelect={(k) => setMenuTab(k)}
            className="mt-3"
            justify
          >
            <Tab eventKey="makanan" title="Makanan">
              <ListGroup
                variant="flush"
                style={{ maxHeight: "inherit", overflowY: "auto" }}
              >
                <ListGroup.Item action onClick={itemClicked}>
                  <Row>
                    <Col xs={4}>{noImage}</Col>
                    <Col>asd</Col>
                    <Col>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          infoClicked();
                        }}
                        size="sm"                        
                      >
                        <Plus size={24}></Plus>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="minuman" title="Minuman">
              <ListGroup variant="flush">
                <ListGroup.Item>Minuman</ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="camilan" title="Camilan">
              <ListGroup variant="flush">
                <ListGroup.Item>Camilan</ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>
        </Container>
      </main>
    </div>
  );
}
