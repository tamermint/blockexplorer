import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockInfo, setBlockInfo] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });
  useEffect(() => {
    async function getBlockInfo() {
      setBlockInfo(await alchemy.core.getBlock("latest"));
    }
  });

  return (
    <div className="App">
      Block Number: {blockNumber}
      <div className="BlockInfo">
        <h2>Block Information</h2>
        <p>Hash: {blockInfo.hash}</p>
        <p>Timestamp: {blockInfo.timestamp}</p>
        <p>Difficulty: {blockInfo.difficulty}</p>
        <p>Nonce: {blockInfo.nonce}</p>
        <p>Miner: {blockInfo.miner}</p>
      </div>
      <div className="TransactionInformationForm">
        <h2>Block Transaction Information</h2>
        <p>Enter the block number or hash of the block you want to inspect: </p>
      </div>
    </div>
  );
}

export default App;
