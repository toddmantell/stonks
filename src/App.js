import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStonk from "./pages/AddStonk";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Header />
          <Route exact path="/" component={Dashboard} />
          <Route path="/addstonk" component={AddStonk} />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
