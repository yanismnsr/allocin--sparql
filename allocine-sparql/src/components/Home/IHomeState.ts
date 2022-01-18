import { Movie } from "../../models/types";

export default interface IHomeState {
    movies : Movie[];
    searchString : string;
}