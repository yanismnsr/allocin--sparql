import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar"
import Carousel from "./components/Carousel/Carousel";
import {Movie} from "./models/types";

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
      <Carousel movies={movies}/>
    </div>
  );
}

export default App;
