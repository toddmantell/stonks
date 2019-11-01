import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";
import AddStonk from "./pages/AddStonk";
import Header from "./components/Header";
import UserContext, { UserProvider } from "./data/context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <ErrorBoundary>
          <div className="App">
            <Header />
            <UserContext.Consumer>
              {() => (
                <>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/addstonk" component={AddStonk} />
                </>
              )}
            </UserContext.Consumer>
          </div>
        </ErrorBoundary>
      </Router>
    </UserProvider>
  );
}

export default App;
