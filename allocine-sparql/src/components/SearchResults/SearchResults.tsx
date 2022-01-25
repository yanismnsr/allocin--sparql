import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes, useMatch } from 'react-router-dom'
import { Movie } from '../../models/types'
import { Service } from '../../services/Service'
import Carousel from '../Carousel/Carousel'
import ISearchResultsProps from './ISearchResultsProps'
import ISearchResultsState from './ISearchResultsState'
import styles from './SearchResults.module.css'
import FilmCard from '../FilmCard/FilmCard'
import { useSearchParams } from 'react-router-dom'
import { trackPromise } from 'react-promise-tracker'
import MoviesGrid from '../MoviesGrid/MoviesGrid'

export default function SearchResults(props: ISearchResultsProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const searchString = searchParams.get('searchString')
    const ppageNumber = Number.parseInt(searchParams.get('page') || '1')
    const searchMethod = searchParams.get('searchMethod')
    const year = searchParams.get('year')

    const [movies, setMovies] = useState<Movie[]>([])
    const [pageNumber, setPageNumber] = useState<number>(ppageNumber)

    const minPage = Math.max(pageNumber - 4, 1)
    const maxPage = minPage + 9

    function _sparqlSearch() {
        const serviceInstance = Service.GetInstance()
        serviceInstance
            .fetchMovie(
                {
                    title: searchString
                },
                { size: 15, page: pageNumber }
            )
            .then((result) => {
                console.log(result.results.bindings)
                const foundMovies = result.results.bindings.map((m: any) => {
                    console.log(m)
                    return {
                        title: m.title.value,
                        description: 'test',
                        releaseYear: m.releaseYear
                            ? m.releaseYear.value
                            : 'Undefined',
                        urlThumbnail: m.urlThumbnail
                            ? m.urlThumbnail.value
                            : 'https://imgsrc.cineserie.com/2017/02/Filmandclapboard.jpg?ver=1',
                        ranking: 2.5,
                    }
                })
                setMovies(foundMovies)
            })
    }

    function _imdbSearch() {
        const serviceInstance = Service.GetInstance()
        serviceInstance
            .fetchMovieApi({ title: searchString, year: year, page: pageNumber })
            .then((result: any) => {
                const foundMovies = result.map((m: any) => {
                    return {
                        wikiId: m.imdbid,
                        isImdb: true,
                        title: m.title,
                        description: m.title,
                        releaseYear: m.year,
                        urlThumbnail: m.poster
                            ? m.poster
                            : 'http://imgsrc.cineserie.com/2017/02/Filmandclapboard.jpg?ver=1',
                        type: m.type,
                    }
                })
                setMovies(foundMovies)
            })
    }

    function _handleSearch() {
        // Build the sparql query
        console.log('searchString : ' + searchString)
        console.log('searchMethod : ' + searchMethod)
        if (searchMethod === 'Sparql search') {
            _sparqlSearch()
        } else {
            _imdbSearch()
        }
    }

    function handleChangeSearchPage(pageNumber: number) {
        searchParams.delete('page')
        searchParams.append('page', '' + pageNumber)
        setSearchParams(searchParams.toString())
        setPageNumber(pageNumber)
    }

    useEffect(() => {
        console.log('updating in use effect')
        _handleSearch()
    }, [searchString, year, searchMethod, pageNumber])

    return (
        <div className={styles.whitetext}>
            <h1>Search results</h1>
            <MoviesGrid movies={movies} />
            <div className={styles.center}>
                {Array.from(Array(maxPage - minPage + 1).keys()).map((_, i) => {
                    console.log('something')
                    return (
                        <a onClick={(_) => handleChangeSearchPage(minPage + i)}>
                            {' '}
                            {minPage + i}{' '}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
