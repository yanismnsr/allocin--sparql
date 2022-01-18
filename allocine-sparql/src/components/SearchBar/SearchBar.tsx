import React from 'react';
import * as sparql from 'sparqljs';
import styles from './SearchBar.module.css';
import { ISearchBarState } from "./ISearchBarState";
import { ISearchBarProps } from "./ISearchBarProps";
import { textChangeRangeIsUnchanged } from 'typescript';
import {Service} from "../../services/Service";

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {

  constructor(props: ISearchBarProps) {
    super(props);

    // Setting the state
    this.state = {
      searchString: 'Entrez un nom de film'
    };

    // Binding handlers
    this._handleChange = this._handleChange.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
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
    serviceInstance.fetchMovie({"title": searchString}, {"size": 10, "page": 1});
  }

  public render() {
    return (
      <div className={styles.SearchBar}>
        <div className={styles.box}>
            <img src="./images/logo.png" alt="Logo" className={styles.logo} />
            <input type="text" id="filmName" onChange={this._handleChange} className={styles.inputSearchBar}/>
            <button type="submit" onClick={this._handleSearch} className={styles.searchButton}>Rechercher</button>
        </div>
        <div className={styles.boxFiltres}>
            <div className={styles.dropdown}>
            <button className={styles.buttonDropdown}>Genre ∨</button>
              <div className={styles.dropdownContent}>
              <p>
                    <input type="checkbox" id="action" name="genre" value="action" />
                    <label>Action</label>
              </p>
              <p>
                    <input type="checkbox" id="romance" name="genre" value="romance" />
                    <label>Romance</label>
              </p>
              <p>
                    <input type="checkbox" id="thriller" name="genre" value="thriller" />
                    <label>Thriller</label>
              </p>
              </div>
            </div>
            <div className={styles.dropdown}>
            <button className={styles.buttonDropdown}>Année ∨</button>
              <div className={styles.dropdownContent}>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
