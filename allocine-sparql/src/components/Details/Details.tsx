import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes, useMatch } from 'react-router-dom'
import styles from './Details.module.css'
import { trackPromise } from 'react-promise-tracker'
import { Service } from '../../services/Service'

import { useSearchParams } from 'react-router-dom'
import IDetailsState from './IDetailsState'

export default function Details(props: any) {
    const serviceInstance = Service.GetInstance()
    const [searchParams, setSearchParams] = useSearchParams()
    const isImdb = searchParams.get('isImdb')
    const id = searchParams.get('id')
    useEffect(() => {
        console.log('updating in use effect')
        _handleSearch()
    }, [searchString, yearMin, yearMax, searchMethod, pageNumber])

    
    trackPromise(serviceInstance.fetchMovieApi({ id: id })).then(
        (result: any) => {
            if (result != undefined)
   
        }
    )

    return (
        <div>
            <h2 className={styles.whitetext}>Details page</h2>
            <div className={styles.filmCard}>
                <div className={styles.filmImageBox}>
                    <img
                        className={styles.filmImage}
                        src={props.filmThumbnail}
                        alt=""
                    />
                </div>

                <div className={styles.filmContent}>
                    <p className={styles.filmTitle}>{props.movie}</p>
                    <div className={styles.row}>
                        <p className={styles.filmYear}>{props.filmYear}</p>
                    </div>
                </div>
            </div>
        </div>
    )

    // const serviceInstance = Service.GetInstance()
    // serviceInstance
    //     .fetchMovie(
    //         {
    //             title: searchString,
    //             beforeYear: yearMin,
    //             afterYear: yearMax,
    //         },
    //         { size: 15, page: pageNumber }
    //     )
    //     .then((result) => {
    //         console.log(result.results.bindings)
    //         const foundMovies = result.results.bindings.map((m: any) => {
    //             console.log(m)
    //             return {
    //                 title: m.title.value,
    //                 wikiId: m.wikiId.value,
    //                 description: 'test',
    //                 releaseYear: m.releaseYear
    //                     ? m.releaseYear.value
    //                     : 'Undefined',
    //                 urlThumbnail: m.urlThumbnail
    //                     ? m.urlThumbnail.value
    //                     : 'https://imgsrc.cineserie.com/2017/02/Filmandclapboard.jpg?ver=1',
    //                 ranking: 2.5,
    //             }
    //         })
    //         setMovies(foundMovies)
    //     })
}
