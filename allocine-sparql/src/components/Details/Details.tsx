import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes, useMatch } from 'react-router-dom'
import styles from './Details.module.css'
import { trackPromise } from 'react-promise-tracker'
import { Service } from '../../services/Service'

import { useSearchParams } from 'react-router-dom'
import IDetailsState from './IDetailsState'
import { Movie } from 'imdb-api'

export default function Details(props: any) {
    const serviceInstance = Service.GetInstance()
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('id')
    const [movie, setMovie] = useState<any>(undefined)

    useEffect(() => {
        trackPromise(serviceInstance.fetchMovieApi({ id: id })).then(
            (result: any) => {
                if (result != undefined) {
                    setMovie(result)
                }
            }
        )
    }, [])

    return (
        <div>
            <h2 className={styles.whitetext}>Details page</h2>
            {movie != undefined ? (
                <div className={styles.whitetext}>
                    <div className={styles.whitetext}>
                        <img
                            className={styles.filmImage}
                            src={movie?.poster}
                            alt=""
                        />
                    </div>

                    <div className={styles.whitetext}>
                        <p className={styles.whitetext}>{movie!.title}</p>
                        <div className={styles.row}>
                            <p className={styles.whitetext}>
                                {'Date de sortie : ' + movie!.year}
                            </p>{' '}
                            <p className={'Duration : ' + styles.whitetext}>
                                {movie!.runtime}
                            </p>
                        </div>
                        <p className={styles.whitetext}>
                            {'Genres : ' + movie!.genres}
                        </p>
                        <p className={styles.whitetext}>
                            {'Director : ' + movie!.director}
                        </p>{' '}
                        <p className={styles.whitetext}>
                            {'Synopsis : ' + movie!.plot}
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
