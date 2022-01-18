import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes, useMatch } from 'react-router-dom';
import IHomeProps from './IHomeProps';
import { Movie } from '../../models/types';
import IHomeState from './IHomeState';
import styles from './Home.module.css';

export default function Home (props: IHomeProps) {

    const [state, setState] = useState<IHomeState>({
        movies: [],
        searchString: ""
    });

    console.log(state.movies);

    return <h1 className={styles.whitetext}>Home</h1>;

}