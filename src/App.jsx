import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/" component={Login}></Route>
      </Switch>
    </Router>
  );
};
export default App;
