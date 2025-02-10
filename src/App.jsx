import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import HeroPage from "./components/sectionOne"; // ProductPage
import Form from "./components/form";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HeroPage />} />  {/* Product Page */}
        <Route path="/form" element={<Form />} />  {/* Form Page */}
      </Routes>
    </Router>
  );
};

export default App;
