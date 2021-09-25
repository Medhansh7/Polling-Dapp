import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllPoll from "./components/AllPoll/AllPoll";
import Createpoll from "./components/CreatePoll/Createpoll";

export default function Routes() {
  return (
    <div style={{ marginTop: "100px" }}>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/allpolls">
          <AllPoll />
        </Route>
        <Route path="/" exact>
          <Createpoll />
        </Route>
      </Switch>
    </div>
  );
}
