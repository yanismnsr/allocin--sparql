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

    return (
        <div>
            <h1 className={styles.whitetext}>Home</h1>
            <Carousel movies={props.movies}/>
        </div>
    );

}
