import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";

import "./App.css";

class App extends Component {
  state = {
    storageValue: "",
    buffer: null,
    web3: null,
    accounts: [],
    contract: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts: accounts, contract: instance });
      console.log(accounts[0]);
      this.runExample();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract } = this.state;

    // Stores a given value, 5 by default.
    this.setValue();
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  captureFile = (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const file = event.target.files[0];

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer:", this.state.buffer);
    };
  };

  onSubmit = (event) => {
    const { accounts, contract } = this.state;
    event.preventDefault();
    ipfs.files.add(this.state.buffer, async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(result[0].hash);
      const receipt = contract.methods
        .set(result[0].hash)
        .send({ from: accounts[0] });
      receipt
        .then((res) => console.log(res))
        .catch((e) => console.log(e.message));
      console.log(receipt);
      console.log("IPFS HASH:", this.state.storageValue);
      return this.setState({ storageValue: result[0].hash });
    });
  };

  setValue = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.set("420").send({ from: accounts[0] });

    // return this.setState({ storageValue: receipt });
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>IPFS File Uploader</h1>
        <button onClick={this.setValue}>ENTER</button>
        <p>This Image is stored on IPFS & The Ethereum Blockchain</p>
        <img
          src={`https://ipfs.io/ipfs/${this.state.storageValue}`}
          alt="Not-images"
        />
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <input type="submit" />
        </form>

        <br />
        <p>{this.state.storageValue}</p>
      </div>
    );
  }
}

export default App;
