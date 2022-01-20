import React, {useEffect, useState} from 'react';
import IFilmDetailsProps from './IFilmDetailsProps';
import { Movie } from '../../models/types';
import IFilmDetailsState from './IFilmDetailsState';
import styles from './FilmDetails.module.css';
import { Service } from '../../services/Service';
import Carousel from '../Carousel/Carousel';

export default function Home (props: IFilmDetailsProps) {

    const [film, setFilm] = useState<Movie>();

    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <Carousel/>
            </div>
            <div className={styles.details}>
                <div className={styles.title}>
                    {film?.title}
                </div>
                <div className={styles.description}>
                    {film?.description}
                </div>
            </div>
        </div>
    );
}
