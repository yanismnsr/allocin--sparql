import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar"
import Details from "./components/Details/Details";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Carousel from "./components/Carousel/Carousel";
import {Movie} from "./models/types";
import Home from './components/Home/Home';

function App() {

  const movies: Movie[] = [
      {
          title: "Film 1",
          description: "test",
          releaseYear: "2015",
          urlThumbnail: "https://picsum.photos/200/300",
          ranking: 1
      },
      {
          title: "Film 2",
          description: "test",
          releaseYear: "2015",
          urlThumbnail: "https://picsum.photos/200/300",
          ranking: 2
      },
      {
          title: "Film 3",
          description: "test",
          releaseYear: "2015",
          urlThumbnail: "https://picsum.photos/200/300",
          ranking: 3
      },
      {
          title: "Film 4",
          description: "test",
          releaseYear: "2015",
          urlThumbnail: "https://picsum.photos/200/300",
          ranking: 3.7
      },
      {
          title: "Film 5",
          description: "test",
          releaseYear: "2015",
          urlThumbnail: "https://picsum.photos/200/300",
          ranking: 4.8
      },
      {
          title: "Film 6",
          description: "test",
          releaseYear: "2015",
          urlThumbnail: "https://picsum.photos/200/300",
          ranking: 4.5
      },
      {
          title: "Film 7",
          description: "test",
          releaseYear: "2015",
          urlThumbnail: "https://picsum.photos/200/300",
          ranking: 2.5
      }
  ]

  return (
    <div className="App">
      <SearchBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/details" element={<Details/>} />
        </Routes>
      </BrowserRouter>
      {/* <Carousel movies={movies}/> */}
    </div>
  );
}

export default App;
