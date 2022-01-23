import React from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes, useMatch } from 'react-router-dom'
import styles from './Details.module.css'
import { trackPromise } from 'react-promise-tracker'
import { Service } from '../../services/Service'

export default function Details(props: any) {
    const serviceInstance = Service.GetInstance()
    const { search } = useLocation()

    trackPromise(serviceInstance.fetchMovieApi({ wikiId: props.wikiId })).then(
        (result: any) => {
            console.log(result)
        }
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

    const match = useMatch('/details/:item')
    console.log(match?.params)

    return <h2 className={styles.whitetext}>Details page</h2>
}
