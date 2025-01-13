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
      <h1>BLOCK CHECKER</h1>
      <h2>RECENT BLOCKS</h2>
      {/* need to make a way to get the most recent block numbers and make them clickable */}
      <div className="block-container"></div>
      <div className="BlockInfoForm">
        {/* need to make this into a button so that we don't get 429 */}
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
        {/* here we need to limit details we want to to bring in */}
      </div>
      <div className="TransactionReceiptInvestigator">
        <h2>Transaction Receipt Information</h2>
        <p>Enter the transaction hash you want to inspect: </p>
        {/* here we need to limit details we want to to bring in */}
      </div>
    </div>
  );
}

export default App;
