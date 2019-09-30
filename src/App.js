import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStonk from "./pages/AddStonk";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">STONKS!</header>
        <Route exact path="/" component={Dashboard} />
        <Route path="/addstonk" component={AddStonk} />
      </div>
    </Router>
  );
}

export default App;
