import { Alchemy, Network } from "alchemy-sdk";
import { useState } from "react";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockInfo, setBlockInfo] = useState("");
  const [blockTxInfo, setBlockTxInfo] = useState("");
  const [userBlockInput, setUserBlockInput] = useState("");
  const [userTxInput, setUserTxInput] = useState("");
  const [txInfo, setTxInfo] = useState("");
  const [userAcctInput, setUserAcctInput] = useState("");
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
    try {
      const txData = await alchemy.core.getTransactionReceipt(userTxInput);
      setTxInfo(txData);
    } catch (err) {
      console.log("Failed to fetch transaction data", err);
    }
  }

  async function getAccountInformation() {
    const acctData = await alchemy.core.getBalance(userAcctInput, "latest");
    setAccountInfo(acctData);
  }

  return (
    <div className="App">
      <h1 className="text-2xl font-bold">BLOCK CHECKER</h1>
      <div className="grid-container">
        <div className="Latest-Block Card">
          <h2>Latest Block</h2>
          <p>Block Hash: {blockInfo?.hash}</p>
          <p>Block Number: {blockInfo?.number}</p>
          <p>Block Difficulty: {blockInfo?.difficulty}</p>
          <p>Nonce: {blockInfo?.nonce}</p>
          <p>Timestamp: {blockInfo?.timestamp}</p>
          <p>Block Miner: {blockInfo?.miner} </p>
          <p>Gas Used: {String(blockInfo?.gasUsed)}</p>
          <p>Gas Limit: {String(blockInfo?.gasLimit)}</p>
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
          {/* here we need to limit details we want to to bring in */}
          <p>To: {txInfo?.to}</p>
          <p>From: {txInfo?.from} </p>
          <p>Contract Address: {txInfo?.contractAddress || "N/A"}</p>
          <p>Status: {String(txInfo?.status)}</p>
          <p>Type: {String(txInfo?.type)}</p>
          <p>Gas Used: {String(txInfo?.gasUsed)}</p>
          <p>Gas Price: {String(txInfo?.effectiveGasPrice / 10e8)}</p>
          <input
            type="text"
            value={userTxInput}
            placeholder="Enter the Transaction hash you want to investigate"
            onChange={(e) => setUserTxInput(e.target.value)}
          />
          <button onClick={getTransactionDetail}>Query</button>
        </div>
        <div className="Account-Information Card">
          <h2>Account Information</h2>
          <input
            type="text"
            value={userAcctInput}
            placeholder="Enter the Account address to get the balance"
            onChange={(e) => setUserAcctInput(e.target.value)}
          />
          <p>Balance: {String(accountInfo) / 10e9}</p>
          <button onClick={getAccountInformation}>Query</button>
        </div>
      </div>
    </div>
  );
}

export default App;
