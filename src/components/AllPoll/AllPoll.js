import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./AllPoll.css";
import Votingabi from "../../contracts/Voting.json";

export default function AllPoll() {
  const [allPollm, setAllPollm] = useState();
  const [totalPolls, setTotalPolls] = useState();

  const [polls, allPolls] = useState([]);

  const getBLockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const networkId = await web3.eth.net.getId();

    const networkData = Votingabi.networks[networkId];

    if (networkId) {
      const _voting = new web3.eth.Contract(Votingabi.abi, networkData.address);

      setAllPollm(_voting);
      const numberOfPolls = await _voting.methods.opinionCount().call();
      let arr = [];
      setTotalPolls(numberOfPolls);
      if (totalPolls != "0") {
        for (let i = 0; i < numberOfPolls; i++) {
          const polls = await _voting.methods.opinion(i).call();
          arr.push(polls);
        }
        allPolls(arr);
        // console.log(polls);
      }
    } else {
      window.alert("the smart contract is not deployed on current network");
    }
  };

  useEffect(() => {
    getBLockchainData();
  }, []);

  return (
    <div>
      <h1>Ongoing Polls...</h1>
      <hr className="line" />
      <h4>Total polls count: {totalPolls}</h4>
      {polls.map(
        (e) => (
          <Card data={e} />
        )
        // console.log(e);
      )}
    </div>
  );
}
