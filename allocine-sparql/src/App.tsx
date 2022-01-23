import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Details from './components/Details/Details'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Carousel from './components/Carousel/Carousel'
import { Movie } from './models/types'
import Home from './components/Home/Home'
import { Service } from './services/Service'
import { Spinner } from './components/Spinner/Spinner'
import SearchResults from './components/SearchResults/SearchResults'

function App() {
    const [movies, setMovies] = React.useState<Movie[]>([])
    const [selectedMovie, setSelectedMovie] = React.useState<Movie>()
    const [searchString, setSearchString] = React.useState<string>('')

    useEffect(() => {
        console.log('getting movies from dbpedia')
        const serviceInstance = Service.GetInstance()
        serviceInstance.fetchMovie({}, { size: 10, page: 1 }).then((result) => {
            console.log(result.results.bindings)
            const foundMovies = result.results.bindings.map((m: any) => {
                return {
                    title: m.title.value,
                    description: 'test',
                    wikiId: m.wikiId.value,
                    releaseYear: m.releaseYear?.value,
                    urlThumbnail: m.urlThumbnail?.value,
                }
            })
            setMovies(foundMovies)
        })
        console.log(movies)
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <SearchBar
                    setMovies={setMovies}
                    setSearchString={setSearchString}
                />
                <Routes>
                    <Route
                        path="/"
                        element={<Home setMovies={setMovies} movies={movies} />}
                    />
                    <Route
                        path="/details"
                        element={<Details selectedMovie={selectedMovie} />}
                    />
                    <Route
                        path="/search"
                        element={<SearchResults searchString={searchString} />}
                    />
                </Routes>
                <Spinner />
                {/* <Carousel movies={movies}/> */}
            </div>
        </BrowserRouter>
    )
}

export default App
