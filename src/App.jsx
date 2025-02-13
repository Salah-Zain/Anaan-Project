import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/Home"; // ProductPage
import Form from "./components/form";
import AdminHome from './pages/adminHome'

const App = () => {
  return (
    <Router>
  
      <Routes>
        <Route path="/" element={<HeroPage />} /> 
        <Route path="/form" element={<Form />} /> 
        <Route path="anu/adminhome" element={<AdminHome />} /> 

      </Routes>
    </Router>
  );
};

export default App;
