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

    const match = useMatch('/details/:item')
    console.log(match?.params)

    return <h2 className={styles.whitetext}>Details page</h2>
}
