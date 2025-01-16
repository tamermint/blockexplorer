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
  });
  useEffect(() => {
    async function getBlockInfo() {
      setBlockInfo(await alchemy.core.getBlock("latest"));
    }
  });

  return (
    <div className="App">
      <h1>BLOCK CHECKER</h1>
      <div className="Latest-Block">
        {/*Get the last 6 blocks*/}
        <button onClick={() => setBlockInfo()}>Get Latest Block</button>
      </div>
      {/* need to make this into a button so that we don't get 429 */}
      <div className="Transaction-Information">
        {/*One card for this*/}
        <h2>Block Transaction Information</h2>
        <p>Enter the block number or hash of the block you want to inspect: </p>
        {/* here we need to limit details we want to to bring in */}
      </div>
      <div className="Transaction-Receipt-Investigator">
        {/*One card for this*/}
        <h2>Transaction Receipt Information</h2>
        <p>Enter the transaction hash you want to inspect: </p>
        {/* here we need to limit details we want to to bring in */}
      </div>
      <div className="Account-Information">{/*One card for this*/}</div>
    </div>
  );
}

export default App;
