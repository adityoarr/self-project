"use client";

import { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Button,
  ListGroup,
  Modal,
  Form,
  FloatingLabel,
  Image,
  Accordion,
} from "react-bootstrap";
import { Pencil, Eye, EyeSlash } from "react-bootstrap-icons";

export default function AdminHome() {
  const [keyTab, setKeyTab] = useState("menu");
  const [keyMenu, setKeyMenu] = useState("makanan");
  const [showTambahMenu, setShowTambahMenu] = useState(false);
  // form menu
  const [inputNamaMenu, setInputNamaMenu] = useState("");
  const [inputJenisMenu, setInputJenisMenu] = useState("");
  const [inputDeskripsiMenu, setInputDeskripsiMenu] = useState("");
  const [inputHargaMenu, setInputHargaMenu] = useState("");
  const [previewImagesMenu, setpreviewImagesMenu] = useState([]);

  const modalMenuClose = () => setShowTambahMenu(false);
  const modalMenuShow = () => {
    setInputNamaMenu("");
    setInputJenisMenu("");
    setInputDeskripsiMenu("");
    setInputHargaMenu("");
    setpreviewImagesMenu([]);
    setShowTambahMenu(true);
  };

  const handleHargaMenu = (e) => {
    let value = e.target.value.replace(/[^\d]/g, ""); // Remove non-digits
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots
    setInputHargaMenu(value);
  };
  const handlePicsMenu = (event) => {
    // preview images
    previewImagesMenu.forEach((image) => URL.revokeObjectURL(image.url));
    const fileList = event.target.files;
    const newImages = Array.from(fileList).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setpreviewImagesMenu(newImages);
  };
  const saveMenu = () => {
    modalMenuClose();
  };

  const addMenuModal = (
    <Modal show={showTambahMenu} onHide={modalMenuClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel label="Nama Menu" className="mb-3">
            <Form.Control type="text" defaultValue={inputNamaMenu} />
          </FloatingLabel>
          <FloatingLabel label="Jenis Menu" className="mb-3">
            <Form.Select defaultValue={inputJenisMenu}>
              <option value="">--Pilih--</option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Camilan">Camilan</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel label="Deskripsi Menu" className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={inputDeskripsiMenu}
              style={{ height: "6rem" }}
            />
          </FloatingLabel>
          <FloatingLabel label="Harga Menu" className="mb-3">
            <Form.Control
              type="text"
              onChange={handleHargaMenu}
              value={inputHargaMenu}
            />
          </FloatingLabel>
          <Form.Group className="mb-3">
            <Form.Label>Gambar Menu</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handlePicsMenu}
            />
          </Form.Group>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
            {previewImagesMenu.map((image, index) => (
              <div key={index} style={{ margin: "10px", textAlign: "center" }}>
                <Image
                  src={image.url}
                  alt={image.file.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={modalMenuClose}>
          Batal
        </Button>
        <Button variant="warning" onClick={saveMenu}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );

  useEffect(() => {
    return () => {
      previewImagesMenu.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [previewImagesMenu]);

  return (
    <main>
      <Container>
        {addMenuModal}
        <Tabs
          id="controlled-tab"
          activeKey={keyTab}
          onSelect={(j) => setKeyTab(j)}
          className="mb-3"
          justify
        >
          <Tab eventKey="menu" title="Menu">
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                className="mb-3"
                onClick={modalMenuShow}
              >
                Tambah Menu
              </Button>
            </div>
            <Tabs
              id="controlled-tab-menu"
              activeKey={keyMenu}
              onSelect={(k) => setKeyMenu(k)}
              className="mb-3"
              justify
            >
              <Tab eventKey="makanan" title="Makanan">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div>
                            <span className="text-break text-uppercase fw-bolder">
                              Makanan
                            </span>
                            <br />
                            <span className="fw-medium mt-2">harga</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col>
                              <p className="text-break">Deskripsi</p>
                              <p className="text-break">Gambar</p>
                            </Col>
                            <Col xs={2}>
                              <Pencil className="me-4 mb-4 text-warning" />
                              <Eye className="text-success" />
                              <EyeSlash className="text-secondary" />
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
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
          </Tab>

          <Tab eventKey="history-pesanan" title="History Pesanan">
            Pesanan
          </Tab>

          <Tab eventKey="pengaturan" title="Pengaturan">
            <Row>
              <Col>
                <div className="d-grid gap-2 mt-5">
                  <Button variant="danger">Logout</Button>
                </div>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </main>
  );
}
