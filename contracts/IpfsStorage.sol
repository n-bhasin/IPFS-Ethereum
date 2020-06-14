//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;

/**
  @author Bhasin Neeraj
*/
contract IpfsStorage {
    //structure
    struct Data {
        uint256 id;
        address from;
        bytes ipfsAddress;
        uint256 timestamp;
    }
    //map the address to ipfs_hash
    // mapping(address => Data) public imageData;
    mapping(address => string) ipfsHash;
    mapping(uint256 => Data) public data;
    uint256[] Ids;
    uint256 dataId;
    //events
    event SendHash(address indexed, string indexed);
    event ReceivedHash(string indexed);
    //modifiers
    modifier checkNull(string memory _ipfsHash) {
        bytes memory checkString = bytes(_ipfsHash);
        require(
            checkString.length != 0,
            "IpfsStorage: Length is not equal to zero"
        );
        _;
    }

    constructor() public {}

    /**
      @dev take the from the address and ipfs file hash and map them together.
     
      @param _ipfsHash -> hash the file which you want to store
      author: Bhasin Neeraj
     */
    function storingHash(string memory _ipfsHash) public checkNull(_ipfsHash) {
        dataId++;
        data[dataId] = Data(
            dataId,
            msg.sender,
            bytes(_ipfsHash),
            block.timestamp
        );
        ipfsHash[msg.sender] = _ipfsHash;
        Ids.push(dataId);
        emit SendHash(msg.sender, _ipfsHash);
    }

    /**
        @dev retrieve all the IDs from array of id.
        author: Bhasin Neeraj
     */
    function getIds() public view returns (uint256[] memory) {
        return Ids;
    }

    /**
        @dev retrieve all values of struct
        author: Bhasin Neeraj
     */
    function getValues(uint256 _id)
        public
        view
        returns (
            uint256,
            address,
            bytes memory,
            uint256
        )
    {
        return (
            data[_id].id,
            data[_id].from,
            data[_id].ipfsAddress,
            data[_id].timestamp
        );
    }

    /**
      @dev check for the hash.
      If the length of hash if 0 then return the custom message otherwise hash.
      author: Bhasin Neeraj
     */
    function checkInbox(address _to) public  view returns(string memory){
        string memory ipfs_hash = ipfsHash[_to];
        require(bytes(ipfs_hash).length != 0, "No hash");
        return ipfsHash[_to];
    }
}
