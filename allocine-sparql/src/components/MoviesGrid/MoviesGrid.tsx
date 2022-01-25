import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes, useMatch } from 'react-router-dom'
import { Movie } from '../../models/types'
import { Service } from '../../services/Service'
import Carousel from '../Carousel/Carousel'
import IMoviesGridProps from './IMoviesGridProps'
import IMoviesGridState from './IMoviesGridState'
import styles from './MoviesGrid.module.css'
import FilmCard from '../FilmCard/FilmCard'

export default function MoviesGrid(props: IMoviesGridProps) {
    return (
        <div className={styles.container}>
            {props.movies.map((movie: Movie, index: number) => {
                return (
                    <div
                        className={styles['center-aligned-item']}
                        key={'' + index}
                    >
                        <FilmCard
                            wikiId={movie.wikiId}
                            isImdb={movie.isImdb}
                            filmTitle={movie.title}
                            filmYear={movie.releaseYear!}
                            filmThumbnail={movie.urlThumbnail!}
                            filmRanking={movie.ranking!}
                        />
                    </div>
                )
            })}
        </div>
    )
}
