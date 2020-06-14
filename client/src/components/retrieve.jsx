import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { retrieveFile } from "../blockchain/action";
import ipfs from "../ipfs";

const Retrieve = () => {
  const [address, setAddress] = useState(null);
  const [receivedFile, setReceivedFile] = useState(null);

  const captureHash = async (event) => {
    event.preventDefault();
    const userAddress = event.target.value;
    console.log(userAddress);

    const receipt = await retrieveFile(userAddress);
    console.log(receipt);
    setAddress(receipt);
    getFile(receipt);
  };
  const getFile = async (result) => {
    // event.preventDefault();
    // const result = event.target.value;
    await ipfs.files.get(result, (err, res) => {
      res.forEach((file) => {
        console.log("filepath", file.path);
        const filePath = file.path;
        const getImage = file.content.toString("utf8");
        console.log("file content => ", getImage);
        setReceivedFile(filePath);
      });
    });
  };

  return (
    <div>
      <h3>Please Input your address to retrieve the hash & image</h3>
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
          onChange={(e) => captureHash(e)}
          autoFocus
        />
      </InputGroup>
      {address}
      <br />
      {address != null ? (
        <img src={`https://ipfs.io/ipfs/${receivedFile}`} alt="No-images" />
      ) : (
        "There is no image"
      )}
    </div>
  );
};

export default Retrieve;
