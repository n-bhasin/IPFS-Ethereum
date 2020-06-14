import React from "react";
import "./App.css";
import { Col, Row } from "react-bootstrap";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Store from "./components/store";
import Retrieve from "./components/retrieve";

function App() {
  return (
    <div className="App">
      <Row>
        <Col>
          <Navbar name="Photo Timestamping" />
        </Col>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col>
          <Store />
        </Col>
        <Col>
          <Retrieve />
        </Col>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col>
          {" "}
          <Footer name="Made By: Bhasin Neeraj" />
        </Col>
      </Row>
    </div>
  );
}

export default App;
