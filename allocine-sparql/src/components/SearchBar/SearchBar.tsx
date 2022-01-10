import React from 'react';
import styles from './SearchBar.module.css';
import { ISearchBarState } from "./ISearchBarState";
import { ISearchBarProps } from "./ISearchBarProps";
import { textChangeRangeIsUnchanged } from 'typescript';
// import {Service} from "../../services/Service";

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {

  constructor(props: ISearchBarProps) {
    super(props);

    // Setting the state
    this.state = {
      searchString: 'enter a movie title'
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

  }

  public render() {
    return (
      <div className={styles.SearchBar}>
        <input type="text" id="filmName" onChange={this._handleChange}/>
        <button type="submit" onClick={this._handleSearch}>Search</button>
      </div>
    );
  }
}
