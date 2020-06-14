import React from "react";
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
      const receipt = addingFile(ipfsHash[0].hash);
      console.log(receipt);
      setResponse(ipfsHash[0].hash);
    });
  };
  return (
    <div>
      <form
        id="ipfs-hash-form"
        className="scep-form"
        onSubmit={onIPFSSubmit.bind(this)}
      >
        <input type="file" onChange={captureFile} />
        <button type="submit">Send it</button>
      </form>

      {response}
    </div>
  );
};

export default Store;
