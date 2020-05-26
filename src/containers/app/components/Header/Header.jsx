import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import { ROUTES } from '../../../../utils/constants';

import logo from '../../../../assets/logo.png';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.HeaderContainer}>
      <header className={styles.header}>
        <Link to={ROUTES.employees}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Xoomworks logo" />
          </div>
        </Link>
        <div className={styles.navigationContainer}>
          <Navigation />
        </div>
      </header>
    </div>
  )
};

export default Header;
