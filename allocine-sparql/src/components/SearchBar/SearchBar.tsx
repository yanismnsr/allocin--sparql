import React from 'react';
import styles from './SearchBar.module.css';

// const SearchBar = () => (
//   <div className={styles.SearchBar}>
//     SearchBar Component
//   </div>
// );

export default class SearchBar extends React.Component {
  public render() {
    return (
      <div className={styles.SearchBar}>
        <input type="text" id="filmName" />
        <button type="submit">Search</button>
      </div>
    );
  }
}

// export default SearchBar;
