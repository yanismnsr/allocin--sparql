import React from 'react';
import * as sparql from 'sparqljs';
import styles from './SearchBar.module.css';
import { ISearchBarState } from "./ISearchBarState";
import { ISearchBarProps } from "./ISearchBarProps";
import { textChangeRangeIsUnchanged } from 'typescript';
import {Service} from "../../services/Service";
import MultiRangeSlider from "./../MultiRangeSlider";
import { trackPromise } from 'react-promise-tracker';


export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {

  constructor(props: ISearchBarProps) {
    super(props);

    // Setting the state
    this.state = {
      searchString: 'Enter a movie...',
      yearMin: 1891,
      yearMax: 2022,
      genres: []
    };

    // Binding handlers
    this._handleChange = this._handleChange.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._addOrRemoveGenre = this._addOrRemoveGenre.bind(this);
    this._year = this._year.bind(this);
  }

  private _handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchString: event.target.value
    })
  }

  private _addOrRemoveGenre (event: React.ChangeEvent<HTMLInputElement>) {
    const { genres } = this.state;
    if(genres.includes(event.target.value)) {
        const index = genres.indexOf(event.target.value, 0);
        if (index > -1) {
           genres.splice(index, 1);
        }
    }else{
        genres.push(event.target.value);
    }
  }

  private _year (value: any) {
    this.setState({
        yearMin: value.min,
        yearMax: value.max
    })
  }

  private _handleSearch() {
    // Build the sparql query
    const { searchString, yearMin, yearMax, genres } = this.state;
    console.log("searchString : " + searchString);
    console.log("yearMin : " + yearMin + " yearMax : " + yearMax);
    console.log("genres : " + genres);
    const serviceInstance = Service.GetInstance();
    trackPromise(serviceInstance.fetchMovie({"title": searchString}, {size:100, page:1})).then((result) => {
        //console.log(result.results.bindings);
        const foundMovies = result.results.bindings.map((m: any) => {
          console.log(m);
            return {
                title: m.title.value,
                description: "test",
                releaseYear: (m.releaseYear) ? m.releaseYear.value : "Undefined",
                urlThumbnail: (m.thumbnail) ? m.thumbnail.value : "http://imgsrc.cineserie.com/2017/02/Filmandclapboard.jpg?ver=1",
                ranking: 2.5
            }
        });
        console.log(foundMovies);

        // @ts-ignore
        this.props.setMovies(foundMovies);
    });
  }


  public render() {
    return (
      <div className={styles.SearchBar}>
        <div className={styles.box}>
            <img src="./images/logo2.png" alt="Logo" className={styles.logo} />
            <div>
                <input type="text" id="filmName" onChange={this._handleChange} className={styles.inputSearchBar}/>
                <div className={styles.boxFiltres}>
                            <div className={styles.dropdown}>
                            <button className={styles.buttonDropdown}>Genre</button>
                              <div className={styles.dropdownContent}>
                              <p>
                                    <input type="checkbox" id="action" name="genre" value="action" onChange={this._addOrRemoveGenre} />
                                    <label>Action</label>
                              </p>
                              <p>
                                    <input type="checkbox" id="thriller" name="genre" value="comic" onChange={this._addOrRemoveGenre} />
                                    <label>Comic</label>
                              </p>
                              <p>
                                    <input type="checkbox" id="romance" name="genre" value="romance" onChange={this._addOrRemoveGenre} />
                                    <label>Romance</label>
                              </p>
                              <p>
                                    <input type="checkbox" id="thriller" name="genre" value="thriller" onChange={this._addOrRemoveGenre} />
                                    <label>Thriller</label>
                              </p>
                              </div>
                            </div>
                            <div className={styles.dropdown}>
                            <button className={styles.buttonDropdown}>Year</button>
                              <div className={`${styles.dropdownContent} ${styles.dropdownYear}`}>
                                <MultiRangeSlider
                                      min={1891}
                                      max={2022}
                                      onChange={this._year}
                                    />
                              </div>
                            </div>
                        </div>
            </div>
            <button type="submit" onClick={this._handleSearch} className={styles.searchButton}>Search</button>
        </div>

      </div>
    );
  }
}
