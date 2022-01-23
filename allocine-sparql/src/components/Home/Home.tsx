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

    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const [state, setState] = useState<IHomeState>({
        movies: [],
        currentPage : page ? parseInt(page) : 1,
    });

    const minPage = Math.max(state.currentPage - 4, 1);
    const maxPage = minPage + 9;

    console.log(minPage);
    console.log(maxPage);
/*    
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
                movies : movies,
                currentPage : state.currentPage
            })
        });

    }, []);
*/
    console.log(Array.from(Array(maxPage - minPage + 1).keys()))

    return (
        <div className={styles.whitetext}>
            <h1 >Latest movies</h1>
            <MoviesGrid movies={props.movies}/>
            <div className={styles.center}>
                {/* {
                    Array.from(Array(maxPage - minPage + 1).keys()).map((_, i) => {
                        console.log("something")
                        return (
                            <span onClick={_ => setSearchParams()}> {minPage + i+1} </span>
                        )
                    })
                } */}
            </div>
        </div>
    );

}
