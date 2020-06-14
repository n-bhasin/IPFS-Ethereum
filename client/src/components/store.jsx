import React from "react";
import { InputGroup, Form, FormControl, Button } from "react-bootstrap";

import { useState } from "react";
import { addingFile } from "../blockchain/action";
import ipfs from "../ipfs";

const Store = () => {
  let [response, setResponse] = useState(null);
  let [buffer, setBuffer] = useState(undefined);

  const captureFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };
  const convertToBuffer = async (reader) => {
    buffer = await Buffer.from(reader.result);
    setBuffer(buffer);
  };
  const onIPFSSubmit = async (event) => {
    event.preventDefault();
    response = await ipfs.files.add(buffer, (err, ipfsHash) => {
      if (err) {
        alert(err);
        return;
      }
      console.log(ipfsHash[0].hash);
      const receipt = addingFile(ipfsHash[0].hash);
      receipt.then((res) => {
        console.log(receipt);
        setResponse(ipfsHash[0].hash);
      });
    });
  };
  return (
    <div>
      <h3>Please Upload Your Image</h3>
      <Form
        id="ipfs-hash-form"
        className="scep-form"
        onSubmit={onIPFSSubmit.bind(this)}
      >
        <InputGroup size="lg" className="mb-3">
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            style={{
              borderRadius: "50px",
              backgroundColor: "#F0F2F5",
              border: 0,
              caretColor: "#007bff",
            }}
            placeholder="Search Your Stock"
            className="customInput"
            onChange={captureFile}
            autoFocus
          />
        </InputGroup>
        {/* <input type="file" onChange={captureFile} /> */}
        <Button style={{ borderRadius: "50px" }} size="lg" block type="submit">
          Send it
        </Button>
      </Form>

      {response != null ? (
        <div>
          <p>Please Note down your Hash.</p>
          <p>{response}</p>
        </div>
      ) : (
        <i>There is no hash..!</i>
      )}
    </div>
  );
};

export default Store;
