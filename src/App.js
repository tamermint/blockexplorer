import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockInfo, setBlockInfo] = useState();
  const [blockTxInfo, setBlockTxInfo] = useState();
  const [userBlockInput, setUserBlockInput] = useState();
  const [txInfo, setTxInfo] = useState("");
  const [accountInfo, setAccountInfo] = useState("");

  async function getBlockInfo() {
    setBlockInfo(await alchemy.core.getBlock("latest"));
  }

  async function getBlockTransactionInformation() {
    try {
      const blockData = await alchemy.core.getBlockWithTransactions(
        userBlockInput
      );
      setBlockTxInfo(blockData);
    } catch (err) {
      console.log("Failed to fetch block data", err);
    }
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
          <p>Block Hash: {blockInfo?.hash}</p>
          <p>Block Number: {blockInfo?.number}</p>
          <p>Block Difficulty: {blockInfo?.difficulty}</p>
          <p>Nonce: {blockInfo?.nonce}</p>
          <p>Timestamp: {blockInfo?.timestamp}</p>
          <p>Block Miner: {blockInfo?.miner} </p>
          <p>Gas Used: {blockInfo?.gasUsed.toString()}</p>
          <p>Gas Limit: {blockInfo?.gasLimit.toString()}</p>
          <button onClick={getBlockInfo}>Get Latest Block</button>
        </div>
        <div className="Block-Transaction-Information Card">
          {/*One card for this*/}
          <h2>Block Transaction Information</h2>
          <p>Parent Hash: {blockTxInfo?.parentHash}</p>
          <p>Block Number:{blockTxInfo?.number} </p>
          <p>Logs Bloom: {blockTxInfo?.logsBloom}</p>
          <p>Block Miner: {blockTxInfo?.miner}</p>
          <p>Transaction Hashes: </p>
          <input
            type="text"
            value={userBlockInput}
            placeholder="Enter a block number or hash"
            onChange={(e) => setUserBlockInput(e.target.value)}
          />
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
