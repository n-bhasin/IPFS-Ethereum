import Web3 from "web3";
import IpfsContract from "../contracts/IpfsStorage.json";

const web3 = new Web3("http://localhost:9545");
const instance = new web3.eth.Contract(
  IpfsContract.abi,
  IpfsContract.networks[5777].address
);

export const addingFile = async (ipfshash) => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  const receipt = await instance.methods
    .storingHash(ipfshash)
    .send({ from: accounts[0] });
  console.log(receipt);
};

export const retrieveFile = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  const receipt = await instance.methods
    .checkInbox()
    .call({ from: accounts[0] });
  console.log(receipt);
  return receipt;
};
