import React, { useState, useEffect } from "react";
import bank from "../../assets/bank.png";
import "./Navbar.css";
import { useHistory } from "react-router-dom";

export default function Navbar(props) {
  const [active, setActive] = useState("/");

  const history = useHistory();

  useEffect(() => {
    setActive(window.location.pathname.toString());
  }, []);

  let navToHome = () => {
    setActive("/");
    history.push("/");
  };
  let navToPolls = () => {
    history.push("/allpolls");
    setActive("/allpolls");
  };

  return (
    <nav
      className="navbar navbar-dark fixed-top shadow p-0"
      style={{ backgroundColor: "black", height: "50px" }}
    >
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        style={{ color: "white" }}
      >
        <img
          src={bank}
          width="50"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        &nbsp; DAPP Voting Booth
      </a>
      <ul className="navbar-nav px-3">
        <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
          <small
            className={active == "/" ? "list-item-nav active" : "list-item-nav"}
            onClick={() => navToHome()}
          >
            Create Poll
          </small>
          <small
            className={
              active == "/allpolls" ? "list-item-nav active" : "list-item-nav"
            }
            onClick={() => navToPolls()}
          >
            Ongoing Poll
          </small>
          <small
            className="list-item-nav"
            style={{ color: "white", marginRight: "40px" }}
          >
            ACCOUNT NUMBER:{props.account}
          </small>
        </li>
      </ul>
    </nav>
  );
}
