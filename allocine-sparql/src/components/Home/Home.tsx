import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes, useMatch, useSearchParams } from 'react-router-dom';
import IHomeProps from './IHomeProps';
import { Movie } from '../../models/types';
import IHomeState from './IHomeState';
import styles from './Home.module.css';
import { Service } from '../../services/Service';
import Carousel from '../Carousel/Carousel';
import MoviesGrid from '../MoviesGrid/MoviesGrid'

export default function Home (props: IHomeProps) {

    const [state, setState] = useState<IHomeState>({
        movies: []
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")
    console.log(page);


    useEffect(() => {
        const serviceInstance = Service.GetInstance();
        serviceInstance.fetchMovie({}, {size:15, page:1}).then((result) => {
            console.log(result.results.bindings);
            const movies = result.results.bindings.map((m: any) => {
                return {
                    title: m.title.value,
                    description: "test",
                    releaseYear: m.releaseYear?.value,
                    urlThumbnail: m.urlThumbnail?.value
                }
            })
            console.log(movies);
            setState({
                movies : movies
            })
        });

    }, []);

    return (
        <div>
            <h1 className={styles.whitetext}>Latest movies</h1>
            <MoviesGrid movies={state.movies}/>
            <div>
                
            </div>
        </div>
    );

}
