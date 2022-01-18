import React from "react";

import styles from "./film-card.module.css";
import Rate from "../Rate/Rate";

export default function FilmCard(props: any) {


    return(
        <div className = {styles.filmCard}>
            <div className = {styles.filmImageBox}>
                <img className = {styles.filmImage} src={ props.filmThumbnail } alt=""/>
            </div>

            <div className = {styles.filmContent}>
                <p className = {styles.filmTitle}>{props.filmTitle}</p>
                <div className = {styles.row}>
                    <p className = {styles.filmYear}>{props.filmYear}</p>
                    <Rate ranking={props.filmRanking}/>
                </div>
            </div>
        </div>
    )
}
