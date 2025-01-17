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
  const [blockInfo, setBlockInfo] = useState();
  const [blockTxInfo, setBlockTxInfo] = useState();
  const [txInfo, setTxInfo] = useState();
  const [accountInfo, setAccountInfo] = useState();

  async function getBlockInfo() {
    setBlockInfo(await alchemy.core.getBlock("latest"));
  }

  async function getBlockTransactionInformation() {
    setBlockTxInfo(await alchemy.core.getBlockWithTransactions());
  }

  async function getTransactionDetail() {
    setTxInfo(await alchemy.core.getTransactionReceipt());
  }

  async function getAccountInformation() {
    setAccountInfo(await alchemy.core.getBalance());
  }

  return (
    <div className="App">
      <h1>BLOCK CHECKER</h1>
      <div className="grid-container">
        <div className="Latest-Block Card">
          {/*Get the last 6 blocks*/}
          <h2>Latest Block</h2>
          <p>Block Hash: </p>
          <p>Block Number: </p>
          <p>Block Difficulty: </p>
          <p>Nonce: </p>
          <p>Block Miner: </p>
          <p>Block Reward: </p>
          <p>Gas Used: </p>
          <p>Gas Limit: </p>
          <p>Base Fee Per Gas: </p>
          <p>Burnt Fees: </p>
          <button onClick={getBlockInfo}>Get Latest Block</button>
        </div>
        <div className="Block-Transaction-Information Card">
          {/*One card for this*/}
          <h2>Block Transaction Information</h2>
          <p>Parent Hash: </p>
          <p>Block Number: </p>
          <p>Logs Bloom: </p>
          <p>Block Size: </p>
          <p>Block Miner: </p>
          <p>Transaction Hashes: </p>
          <p>
            Enter the block number or hash of the block you want to inspect:
          </p>
          <button onClick={getBlockTransactionInformation}>Query</button>
          {/* here we need to limit details we want to to bring in */}
        </div>
        <div className="Transaction-Receipt-Investigator Card">
          {/*One card for this*/}
          <h2>Transaction Receipt Information</h2>
          <p>Enter the transaction hash you want to inspect: </p>
          {/* here we need to limit details we want to to bring in */}
          <p>To: </p>
          <p>From: </p>
          <p>Contract Address: </p>
          <p>Transaction Hash: </p>
          <p>Type: </p>
          <p>Status: </p>
          <p>Gas Used: </p>
          <p>Gas Price: </p>
          <button onClick={getTransactionDetail}>Query</button>
        </div>
        <div className="Account-Information Card">
          <h2>Account Information</h2>
          <p>Enter the account address you want to inspect: </p>
          <p>Balance: </p>
          <button onClick={getAccountInformation}>Query</button>
        </div>
      </div>
    </div>
  );
}

export default App;
