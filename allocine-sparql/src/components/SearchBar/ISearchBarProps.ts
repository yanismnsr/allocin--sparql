import {Movie} from "../../models/types";
import React from "react";

export interface ISearchBarProps {
    setMovies?: React.Dispatch<React.SetStateAction<Movie[]>>
}
