import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStonk from "./pages/AddStonk";
import Header from "./components/Header";
import UserContext from "./data/context/UserContext";

function App() {
  return (
    <UserContext>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Dashboard} />
          <Route path="/addstonk" component={AddStonk} />
        </div>
      </Router>
    </UserContext>
  );
}

export default App;
