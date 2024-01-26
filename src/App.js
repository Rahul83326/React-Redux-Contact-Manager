import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Contacts from "./components/Contacts/Contacts";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles.css";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/add" component={() => <Contacts />} />
      <Route exact path="/edit/:id" component={() => <Contacts />} />
    </div>
  );
};

export default App;
