import React from "react";

import styles from "./film-card.module.css";
import Rate from "../Rate/Rate";
import IFilmCardProps from "./IFilmCardProps";

export default function FilmCard(props: IFilmCardProps) {

    return(
        <div className = {styles.filmCard}>
            <div className = {styles.filmImageBox}>
                <img className = {styles.filmImage} src={ props.filmThumbnail } alt=""/>
            </div>

            <div className = {styles.filmContent}>
                <p className = {styles.filmTitle}>{props.filmTitle}</p>
                <div className = {styles.row}>
                    <p className = {styles.filmYear}>{props.filmYear}</p>
                </div>
            </div>
        </div>
    )
}
