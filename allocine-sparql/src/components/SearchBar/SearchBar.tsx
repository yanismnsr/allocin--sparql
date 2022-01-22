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
      searchString: 'Enter a movie...'
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

  private _handleSearch() {
    // Build the sparql query
    const { searchString } = this.state;
    console.log(searchString);

    const serviceInstance = Service.GetInstance();
    trackPromise(serviceInstance.fetchMovie({"title": searchString}, {size:10, page:1})).then((result) => {
        console.log(result.results.bindings);
        const foundMovies = result.results.bindings.map((m: any) => {
            return {
                title: m.title.value,
                description: "test",
                releaseYear: m.released.value,
                urlThumbnail: m.thumbnail.value,
                ranking: 2.5
            }
        });
        console.log(foundMovies);

        // @ts-ignore
        this.props.setMovies(foundMovies);
    });
  }

  private _addOrRemoveGenre (event: React.ChangeEvent<HTMLInputElement>) {
    //TODO
  }

  private _year (min: number, max: number) {
    //TODO
    console.log(min)
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
                                      onChange={({ min, max }) => this._year(min, max)}
                                    />
                              </div>
                            </div>
                            <div className={`${styles.dropdown} ${styles.ratingCss}`}>
                            <button className={styles.buttonDropdown}>Rating</button>
                              <div className={`${styles.dropdownContent} ${styles.dropdownYear}`}>
                                <div className={styles.starIcon}>
                                  <input type="radio" name="rating1" id="rating1" />
                                  <label htmlFor="rating1">★</label>
                                  <input type="radio" name="rating1" id="rating2" />
                                  <label htmlFor="rating2">★</label>
                                  <input type="radio" name="rating1" id="rating3" />
                                  <label htmlFor="rating3">★</label>
                                  <input type="radio" name="rating1" id="rating4" />
                                  <label htmlFor="rating4">★</label>
                                  <input type="radio" name="rating1" id="rating5" />
                                  <label htmlFor="rating5">★</label>
                                </div>
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
