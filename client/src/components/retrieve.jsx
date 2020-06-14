import React, { useState } from "react";
import { retrieveFile } from "../blockchain/action";
import ipfs from "../ipfs";

const Retrieve = () => {
  const [address, setAddress] = useState(null);
  const [receivedFile, setReceivedFile] = useState(null);
  const captureHash = (event) => {
    event.preventDefault();
    const userAddress = event.target.value;
    console.log(userAddress);
    const receipt = retrieveFile();
    console.log(receipt);
    setAddress(receipt);
    // getFile(receipt);
  };
  const getFile = async (event) => {
    event.preventDefault();
    const result = event.target.value;
    await ipfs.files.get(result, (err, res) => {
      res.forEach((file) => {
        console.log("filepath", file.path);

        const getImage = file.content.toString("utf8");
        console.log("file content => ", getImage);
        setReceivedFile(getImage);
      });
    });
  };
  const onAddressSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form
        id="ipfs-hash-form"
        className="scep-form"
        onSubmit={onAddressSubmit.bind(this)}
      >
        <input type="text" onChange={captureHash} />
        <button type="submit" onClick={captureHash}>
          Send it
        </button>
      </form>

      {address}
      <p>{receivedFile}</p>
      <img src="{receivedFile}" alt="" />
    </div>
  );
};

export default Retrieve;
