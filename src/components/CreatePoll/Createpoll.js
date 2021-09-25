import React, { useState, useEffect } from "react";
import "./Createpoll.css";
import Votingabi from "../../contracts/Voting.json";

export default function Createpoll() {
  const [opinion, setOpinion] = useState("");
  const [description, setDescription] = useState("");
  const [allPollm, setAllPollm] = useState();
  const [date, setDate] = useState();

  const web3 = window.web3;
  useEffect(() => {
    getBLockchainData();
  }, []);

  const getBLockchainData = async () => {
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    const networkData = Votingabi.networks[networkId];
    if (networkId) {
      const _voting = new web3.eth.Contract(Votingabi.abi, networkData.address);
      setAllPollm(_voting);
    } else {
      window.alert("the smart contract is not deployed on current network");
    }
  };

  const createPoll = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    var days = date;
    var dat = new Date() / 1000;
    var res = dat + days * 3600;

    if (opinion != "" || description != "") {
      await allPollm.methods
        .addOpinion(opinion, description, parseInt(res))
        .send({ from: account })
        .on("transactionHash", () => {
          window.alert("Poll Crearted");
        });
      const numberOfPolls = await allPollm.methods.opinionCount().call();
      console.log(numberOfPolls);
    } else {
      window.alert("please fill all the inputs first");
    }
    window.location.reload();
  };

  return (
    <div>
      <h1>Create Your Poll...</h1>
      <hr className="line" />
      <form className="MainForm">
        <div class="form-group">
          <label for="exampleFormControlInput1">Opinion</label>
          <input
            onChange={(e) => setOpinion(e.target.value)}
            type="text"
            class="form-control "
            id="exampleFormControlInput1"
            placeholder="Your Opinion"
          />
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Descibe your thoughts a little ..."
          ></textarea>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">
            Duration of polling (In Hours)
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="number"
            class="form-control "
            id="exampleFormControlInput1"
            placeholder="Hours.."
          />
        </div>
        <div className="btn createPoll" onClick={() => createPoll()}>
          Create Poll
        </div>
      </form>
      <br />
    </div>
  );
}
