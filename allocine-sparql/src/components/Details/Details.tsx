import React from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes, useMatch } from 'react-router-dom';
import styles from './Details.module.css';

export default function Details(props: any) {

    const {search} = useLocation ();

    console.log(search)

    const match = useMatch("/details/:item");
    console.log(match);

  return <h2 className={styles.whitetext}>Details page</h2>;
}
