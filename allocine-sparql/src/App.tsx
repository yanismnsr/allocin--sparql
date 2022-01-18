import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar"
import Details from "./components/Details/Details";
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SearchBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/details" element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
