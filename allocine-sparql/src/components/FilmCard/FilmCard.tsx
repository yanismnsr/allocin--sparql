import React from 'react'

import styles from './film-card.module.css'
import Rate from '../Rate/Rate'
import IFilmCardProps from './IFilmCardProps'
import { Link } from 'react-router-dom'

export default function FilmCard(props: IFilmCardProps) {
    return (
        <Link
            to={
                '/details/' +
                props.wikiId +
                '&isImdb=' +
                (props.wikiId == undefined).toString()
            }
        >
            <div className={styles.filmCard}>
                <div className={styles.filmImageBox}>
                    <img
                        className={styles.filmImage}
                        src={props.filmThumbnail}
                        alt=""
                    />
                </div>

                <div className={styles.filmContent}>
                    <p className={styles.filmTitle}>{props.filmTitle}</p>
                    <div className={styles.row}>
                        <p className={styles.filmYear}>{props.filmYear}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
