import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/Navbar";
import BanksList from "./components/BanksList";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Calculator from "./components/Calculator";


const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<BanksList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
