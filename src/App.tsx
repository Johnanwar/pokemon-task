import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Home from "./features/pokemon/screens/home";
import PokemonDetails from "./features/pokemon/screens/pokemon-details";
 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
