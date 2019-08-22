import '../../assets/stylesheets/min.css';
import React, { Component } from 'react';
import { Navbar } from './components/Navbar';

import styles from './index.css';

export class Root extends Component {
  render() {
    const { title } = this.props;

    return (
      <div>
        <Navbar />
        <h1 className={styles.title}>{title}</h1>
      </div>
    );
  }
}
