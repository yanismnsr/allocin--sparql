import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes, useMatch } from 'react-router-dom';
import IHomeProps from './IHomeProps';
import { Movie } from '../../models/types';
import IHomeState from './IHomeState';
import styles from './Home.module.css';
import { Service } from '../../services/Service';
import Carousel from '../Carousel/Carousel';

export default function Home (props: IHomeProps) {

    const [state, setState] = useState<IHomeState>({
        movies: []
    });

    console.log(state.movies);

    useEffect(() => {
        
    })
    
    console.log("getting movies from dbpedia");
    const serviceInstance = Service.GetInstance();
    serviceInstance.fetchMovie({}, {size:10, page:1}).then((result) => {
        console.log(result.results.bindings);
        const movies = result.results.bindings.map((m: any) => {
            return {
                title: m.title,
                description: "test",
                releaseYear: m.released.value,
                urlThumbnail: m.thumbnail.value,
                ranking: 2.5
            }
        })
        setState({
            movies : movies
        })
    });

    return (
        <div>
            <h1 className={styles.whitetext}>Home</h1>
            <Carousel movies={state.movies}/>
        </div>
    );

}