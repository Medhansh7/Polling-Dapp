import React, { useState, useEffect } from "react";
import "./Card.css";
import Votingabi from "../../contracts/Voting.json";

import upVote from "../../assets/positive-vote.png";
import downVote from "../../assets/negative-vote.png";

import Timer from "../Timer";

export default function Card(props) {
  const [allPollm, setAllPollm] = useState();
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(true);

  const web3 = window.web3;
  useEffect(() => {
    setLoading(true);
    getBLockchainData();
  }, []);

  const getBLockchainData = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setAccount(account);

    const networkId = await web3.eth.net.getId();
    const networkData = Votingabi.networks[networkId];
    if (networkId) {
      const _voting = new web3.eth.Contract(Votingabi.abi, networkData.address);
      setAllPollm(_voting);
    } else {
      window.alert("the smart contract is not deployed on current network");
    }
    setLoading(false);
  };

  const UpVote = async () => {
    await allPollm.methods
      .upVote(props.data[0])
      .send({ from: account })
      .on("transactionHash", () => {
        window.alert("Voted Up");
      });
    window.location.reload();
  };

  const DownVote = async () => {
    await allPollm.methods
      .downVote(props.data[0])
      .send({ from: account })
      .on("transactionHash", () => {
        window.alert("Voted Down");
      });
    window.location.reload();
  };

  return (
    <div>
      {loading ? (
        <h5>Hold Tight. Polls are loading...</h5>
      ) : (
        <div className="card">
          <p className="name">{props.data[2]}</p>
          <p className="desc">{props.data[3]}</p>
          {parseInt(props.data[6]) > Date.now() / 1000 ? (
            <>
              <div className="button-group ">
                <button className="votingButton" onClick={() => UpVote()}>
                  {" "}
                  Vote Up <br />
                  <img height="50px" src={upVote} alt="upVote" />
                  <br />
                  <p>Total UpVotes: {props.data[4]}</p>
                </button>
                <button className="votingButton" onClick={() => DownVote()}>
                  Vote Down <br />
                  <img height="50px" src={downVote} alt="upVote" />
                  <br />
                  <p>Total DownVotes: {props.data[5]}</p>
                </button>
              </div>
              <Timer expiryTimestamp={parseInt(props.data[6])} />
            </>
          ) : (
            <p>Voting Ended For This Poll...</p>
          )}
        </div>
      )}
    </div>
  );
}
