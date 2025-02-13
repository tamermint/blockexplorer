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
    <div className="App dark:bg-slate-800 dark:text-white">
      <h1 className="text-5xl font-bold text-center p-10">BLOCK CHECKER</h1>
      <div className="grid-container grid grid-cols-[800px_minmax(800px,_1fr)] gap-20 p-20 text-wrap max-w-screen-xl">
        <div className="Latest-Block Card overflow-x-auto w-full p-10 mb-8 rounded-3xl border-2 shadow-xl shadow-zinc-500/50 text-left leading-loose">
          <h2 className="text-xl text-center font-bold p-2 mb-4 tracking-wider">
            Latest Block
          </h2>
          <p>Block Hash: {blockInfo?.hash}</p>
          <p>Block Number: {blockInfo?.number}</p>
          <p>Block Difficulty: {blockInfo?.difficulty}</p>
          <p>Nonce: {blockInfo?.nonce}</p>
          <p>Timestamp: {blockInfo?.timestamp}</p>
          <p>Block Miner: {blockInfo?.miner} </p>
          <p>
            Gas Used:{" "}
            {blockInfo?.gasUsed ? blockInfo.gasUsed.toString() : "N/A"}
          </p>
          <p>
            Gas Limit:{" "}
            {blockInfo?.gasLimit ? blockInfo.gasUsed.toString() : "N/A"}
          </p>
          <div className="relative flex flex-row justify-center grow">
            <button
              onClick={getBlockInfo}
              className="border-2 rounded-2xl p-2 mt-6"
            >
              Get Latest Block
            </button>
          </div>
        </div>
        <div className="Block-Transaction-Information Card p-10 mb-8 rounded-3xl border-2 shadow-xl shadow-zinc-500/50 text-left leading-loose">
          {/*One card for this*/}
          <h2 className="text-xl text-center font-bold p-2 tracking-wider mb-4">
            Block Transaction Information
          </h2>
          <p>Parent Hash: {blockTxInfo?.parentHash}</p>
          <p>Block Number:{blockTxInfo?.number} </p>
          <p>Logs Bloom: {blockTxInfo?.logsBloom}</p>
          <p>Block Miner: {blockTxInfo?.miner}</p>
          <label>Block Number or Hash: </label>
          <input
            className="rounded-lg w-3/5 ml-2"
            type="text"
            value={userBlockInput}
            placeholder="Enter a block number or hash"
            onChange={(e) => setUserBlockInput(e.target.value)}
          />
          <div className="mt-10 flex flex-col items-center">
            <button
              className="mt-10 py-2.5 px-10 border-2 rounded-2xl"
              onClick={getBlockTransactionInformation}
            >
              Query
            </button>
          </div>
        </div>
        <div className="Transaction-Receipt-Investigator Card p-10 mb-8 rounded-3xl border-2 shadow-xl shadow-zinc-500/50 text-left leading-loose">
          {/*One card for this*/}
          <h2 className="text-xl text-center font-bold p-2 mb-4 tracking-wider">
            Transaction Receipt Information
          </h2>
          {/* here we need to limit details we want to to bring in */}
          <p>To: {txInfo?.to}</p>
          <p>From: {txInfo?.from} </p>
          <p>Contract Address: {txInfo?.contractAddress || "N/A"}</p>
          <p>Status: {txInfo?.status ? String(txInfo?.status) : "N/A"}</p>
          <p>Type: {String(txInfo?.type)}</p>
          <p>Gas Used: {txInfo?.gasUsed ? String(txInfo?.gasUsed) : "N/A"}</p>
          <p>
            Gas Price:{" "}
            {txInfo?.effectiveGasPrice
              ? String(txInfo?.effectiveGasPrice / 10e8)
              : "N/A"}
          </p>
          <label>Transaction hash: </label>
          <input
            className="rounded-lg w-4/6 ml-2"
            type="text"
            value={userTxInput}
            placeholder="Enter the Transaction hash you want to investigate"
            onChange={(e) => setUserTxInput(e.target.value)}
          />
          <div className="mt-4 flex flex-col items-center">
            <button
              className="mt-10 py-2.5 px-10 border-2 rounded-2xl"
              onClick={getTransactionDetail}
            >
              Query
            </button>
          </div>
        </div>
        <div className="Account-Information Card relative p-10 mb-8 rounded-3xl border-2 shadow-xl shadow-zinc-500/50 text-left leading-loose">
          <h2 className="text-xl text-center font-bold p-2 mb-4 tracking-wider">
            Account Information
          </h2>
          <label>Account Address or ENS name: </label>
          <input
            className="rounded-lg w-1/2 ml-2"
            type="text"
            value={userAcctInput}
            placeholder="Enter the Account address to get the balance"
            onChange={(e) => setUserAcctInput(e.target.value)}
          />
          <p>Balance: {String(accountInfo) / 10e9}</p>
          <div className="flex flex-col items-center mt-4">
            <button
              className="mt-10 py-2.5 px-10 border-2 rounded-2xl"
              onClick={getAccountInformation}
            >
              Query
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
