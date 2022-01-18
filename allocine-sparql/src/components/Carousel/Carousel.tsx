import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {Movie} from "../../models/types";
import FilmCard from "../FilmCard/FilmCard";

export default function Carousel(props:any) {
    return (
        <CarouselProvider
            visibleSlides={5}
            step={5}
            naturalSlideWidth={150}
            naturalSlideHeight={300}
            totalSlides={10}
            infinite
        >
            <Slider>
                {
                    props.movies.map((movie: Movie, key: number) => {
                        return (
                            <Slide index={key}>
                                <FilmCard
                                    filmTitle={movie.title}
                                    filmYear={movie.releaseYear}
                                    filmThumbnail={movie.urlThumbnail}
                                    filmRanking={movie.ranking}
                                />
                            </Slide>
                        );
                    })
                }
            </Slider>
        </CarouselProvider>
    );
}
