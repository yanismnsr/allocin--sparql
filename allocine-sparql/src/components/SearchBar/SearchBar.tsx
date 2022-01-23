import React, { useEffect } from 'react'
import * as sparql from 'sparqljs'
import styles from './SearchBar.module.css'
import { ISearchBarState } from './ISearchBarState'
import { ISearchBarProps } from './ISearchBarProps'
import { textChangeRangeIsUnchanged } from 'typescript'
import { Service } from '../../services/Service'
import MultiRangeSlider from './../MultiRangeSlider'
import { trackPromise } from 'react-promise-tracker'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

export default function SearchBar(props: ISearchBarProps) {
    const navigate = useNavigate()

    const [state, setState] = React.useState<ISearchBarState>({
        searchString: 'Enter a movie...',
        yearMin: 1891,
        yearMax: 2022,
        genres: [],
        searchOption: 'Sparql search',
    })

    function _handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setState({
            searchString: event.target.value,
            yearMin: state.yearMin,
            yearMax: state.yearMax,
            genres: state.genres,
            searchOption: state.searchOption,
        })
    }

    function _addOrRemoveGenre(event: React.ChangeEvent<HTMLInputElement>) {
        const { genres } = state
        if (genres.includes(event.target.value)) {
            const index = genres.indexOf(event.target.value, 0)
            if (index > -1) {
                genres.splice(index, 1)
            }
        } else {
            genres.push(event.target.value)
        }
    }

    function _handleSearch() {
        // Build the sparql query
        const { searchString, yearMin, yearMax, genres } = state
        console.log('searchString : ' + searchString)
        console.log('yearMin : ' + yearMin + ' yearMax : ' + yearMax)
        console.log('genres : ' + genres)
        const serviceInstance = Service.GetInstance()
        navigate(
            `/search?searchString=${searchString}&yearMin=${yearMin}&yearMax=${yearMax}&searchMethod=${state.searchOption}`
        )
        /*
    trackPromise(serviceInstance.fetchMovie({"title": searchString, "beforeYear": yearMin, "afterYear": yearMax, "genres": genres}, {size:10, page:1})).then((result) => {
        console.log(result.results.bindings);
        const foundMovies = result.results.bindings.map((m: any) => {
          console.log(m);
            return {
                title: m.title.value,
                description: "test",
                releaseYear: (m.releaseYear) ? m.releaseYear.value : "Undefined",
                urlThumbnail: (m.urlThumbnail) ? m.urlThumbnail.value : "https://imgsrc.cineserie.com/2017/02/Filmandclapboard.jpg?ver=1",
                ranking: 2.5
            }
        });
        console.log(foundMovies);

        // @ts-ignore
        this.props.setMovies(foundMovies);
    });
    
   */
        trackPromise(
            serviceInstance.fetchMovieApi({ title: searchString })
        ).then((result: any) => {
            const foundMovies = result.map((m: any) => {
                return {
                    imdbId: m.imdbid,
                    title: m.title,
                    description: m.title,
                    releaseYear: m.year,
                    urlThumbnail: m.poster
                        ? m.poster
                        : 'http://imgsrc.cineserie.com/2017/02/Filmandclapboard.jpg?ver=1',
                    type: m.type,
                }
            })

            console.log(foundMovies)

            // @ts-ignore
            this.props.setMovies(foundMovies)
        })
    }

    function _handleSearchTypeChange(option: string) {
        console.log(option)
        setState({
            searchString: state.searchString,
            yearMin: state.yearMin,
            yearMax: state.yearMax,
            genres: state.genres,
            searchOption: option,
        })
    }

    return (
        <div className={styles.SearchBar}>
            <div className={styles.box}>
                <img
                    src="./images/logo2.png"
                    alt="Logo"
                    className={styles.logo}
                />
                <div>
                    <input
                        type="text"
                        id="filmName"
                        onChange={_handleChange}
                        className={styles.inputSearchBar}
                    />
                    <div className={styles.boxFiltres}>
                        <div className={styles.dropdown}>
                            <button className={styles.buttonDropdown}>
                                Genre
                            </button>
                            <div className={styles.dropdownContent}>
                                <p>
                                    <input
                                        type="checkbox"
                                        id="action"
                                        name="genre"
                                        value="action"
                                        onChange={_addOrRemoveGenre}
                                    />
                                    <label>Action</label>
                                </p>
                                <p>
                                    <input
                                        type="checkbox"
                                        id="thriller"
                                        name="genre"
                                        value="comic"
                                        onChange={_addOrRemoveGenre}
                                    />
                                    <label>Comic</label>
                                </p>
                                <p>
                                    <input
                                        type="checkbox"
                                        id="romance"
                                        name="genre"
                                        value="romance"
                                        onChange={_addOrRemoveGenre}
                                    />
                                    <label>Romance</label>
                                </p>
                                <p>
                                    <input
                                        type="checkbox"
                                        id="thriller"
                                        name="genre"
                                        value="thriller"
                                        onChange={_addOrRemoveGenre}
                                    />
                                    <label>Thriller</label>
                                </p>
                            </div>
                        </div>
                        <div className={styles.dropdown}>
                            <button className={styles.buttonDropdown}>
                                Year
                            </button>
                            <div
                                className={`${styles.dropdownContent} ${styles.dropdownYear}`}
                            >
                                <MultiRangeSlider
                                    min={1891}
                                    max={2022}
                                    onChange={({ min, max }) => {
                                        state.yearMax = max
                                        state.yearMin = min
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.radioGroup}>
                            <input
                                type="radio"
                                value="Sparql search"
                                checked={state.searchOption === 'Sparql search'}
                                onChange={() =>
                                    _handleSearchTypeChange('Sparql search')
                                }
                            />
                            <label className={styles.buttonDropdown}>
                                Sparql search
                            </label>
                            <input
                                type="radio"
                                value="IMDB search"
                                checked={state.searchOption === 'IMDB search'}
                                onChange={() =>
                                    _handleSearchTypeChange('IMDB search')
                                }
                            />
                            <label className={styles.buttonDropdown}>
                                IMDB search
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    onClick={_handleSearch}
                    className={styles.searchButton}
                >
                    Search
                </button>
            </div>
        </div>
    )
}

// export default class SearchBar extends React.Component<
//     ISearchBarProps,
//     ISearchBarState
// > {

//     navigate = useNavigate();

//     constructor(props: ISearchBarProps) {
//         super(props)

//         // Setting the state
//         this.state = {
//             searchString: 'Enter a movie...',
//             yearMin: 1891,
//             yearMax: 2022,
//             genres: [],
//             searchOption: 'Sparql search'
//         }

//         // Binding handlers
//         this._handleChange = this._handleChange.bind(this)
//         this._handleSearch = this._handleSearch.bind(this)
//         this._addOrRemoveGenre = this._addOrRemoveGenre.bind(this)
//         this._year = this._year.bind(this)
//     }

//     private _handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//         this.setState({
//             searchString: event.target.value,
//         })
//     }

//     private _addOrRemoveGenre(event: React.ChangeEvent<HTMLInputElement>) {
//         const { genres } = this.state
//         if (genres.includes(event.target.value)) {
//             const index = genres.indexOf(event.target.value, 0)
//             if (index > -1) {
//                 genres.splice(index, 1)
//             }
//         } else {
//             genres.push(event.target.value)
//         }
//     }

//     private _year(value: any) {
//         this.setState({
//             yearMin: value.min,
//             yearMax: value.max,
//         })
//     }

//     private _handleSearch() {
//         // Build the sparql query
//         const { searchString, yearMin, yearMax, genres } = this.state
//         console.log('searchString : ' + searchString)
//         console.log('yearMin : ' + yearMin + ' yearMax : ' + yearMax)
//         console.log('genres : ' + genres)
//         const serviceInstance = Service.GetInstance()
//         /*
//     trackPromise(serviceInstance.fetchMovie({"title": searchString, "beforeYear": yearMin, "afterYear": yearMax, "genres": genres}, {size:10, page:1})).then((result) => {
//         console.log(result.results.bindings);
//         const foundMovies = result.results.bindings.map((m: any) => {
//           console.log(m);
//             return {
//                 title: m.title.value,
//                 description: "test",
//                 releaseYear: (m.releaseYear) ? m.releaseYear.value : "Undefined",
//                 urlThumbnail: (m.urlThumbnail) ? m.urlThumbnail.value : "https://imgsrc.cineserie.com/2017/02/Filmandclapboard.jpg?ver=1",
//                 ranking: 2.5
//             }
//         });
//         console.log(foundMovies);

//         // @ts-ignore
//         this.props.setMovies(foundMovies);
//     });

//    */
//         trackPromise(
//             serviceInstance.fetchMovieApi({ title: searchString })
//         ).then((result: any) => {
//             const foundMovies = result.map((m: any) => {
//                 return {
//                     wikiId: m.imdbid,
//                     title: m.title,
//                     description: m.title,
//                     releaseYear: m.year,
//                     urlThumbnail: m.poster
//                         ? m.poster
//                         : 'http://imgsrc.cineserie.com/2017/02/Filmandclapboard.jpg?ver=1',
//                     type: m.type,
//                 }
//             })

//             console.log(foundMovies)

//             // @ts-ignore
//             this.props.setMovies(foundMovies)
//         })
//     }

//     public render() {
//         return (
//             <div className={styles.SearchBar}>
//                 <div className={styles.box}>
//                     <img
//                         src="./images/logo2.png"
//                         alt="Logo"
//                         className={styles.logo}
//                     />
//                     <div>
//                         <input
//                             type="text"
//                             id="filmName"
//                             onChange={this._handleChange}
//                             className={styles.inputSearchBar}
//                         />
//                         <div className={styles.boxFiltres}>
//                             <div className={styles.dropdown}>
//                                 <button className={styles.buttonDropdown}>
//                                     Genre
//                                 </button>
//                                 <div className={styles.dropdownContent}>
//                                     <p>
//                                         <input
//                                             type="checkbox"
//                                             id="action"
//                                             name="genre"
//                                             value="action"
//                                             onChange={this._addOrRemoveGenre}
//                                         />
//                                         <label>Action</label>
//                                     </p>
//                                     <p>
//                                         <input
//                                             type="checkbox"
//                                             id="thriller"
//                                             name="genre"
//                                             value="comic"
//                                             onChange={this._addOrRemoveGenre}
//                                         />
//                                         <label>Comic</label>
//                                     </p>
//                                     <p>
//                                         <input
//                                             type="checkbox"
//                                             id="romance"
//                                             name="genre"
//                                             value="romance"
//                                             onChange={this._addOrRemoveGenre}
//                                         />
//                                         <label>Romance</label>
//                                     </p>
//                                     <p>
//                                         <input
//                                             type="checkbox"
//                                             id="thriller"
//                                             name="genre"
//                                             value="thriller"
//                                             onChange={this._addOrRemoveGenre}
//                                         />
//                                         <label>Thriller</label>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className={styles.dropdown}>
//                                 <button className={styles.buttonDropdown}>
//                                     Year
//                                 </button>
//                                 <div
//                                     className={`${styles.dropdownContent} ${styles.dropdownYear}`}
//                                 >
//                                     <MultiRangeSlider
//                                         min={1891}
//                                         max={2022}
//                                         onChange={this._year}
//                                     />
//                                 </div>
//                             </div>
//                             <div >
//                                 <div className={styles.radioGroup} >
//                                     <input  type="radio" value="Sparql search" checked={this.state.searchOption === "Sparql search"} onChange={() => this.setState({searchOption: "Sparql search"})}/>
//                                     <label className={styles.buttonDropdown}>Sparql search</label>
//                                     <input  type="radio" value="IMDB search" checked={this.state.searchOption === "IMDB search"} onChange={() => this.setState({searchOption: "IMDB search"})}/>
//                                     <label className={styles.buttonDropdown}>IMDB search</label>
//                                 </div>
//                          </div>
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         onClick={this._handleSearch}
//                         className={styles.searchButton}
//                     >
//                         Search
//                     </button>
//                 </div>
//             </div>
//         )
//     }
// }
