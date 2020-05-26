import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../../../utils/constants';

import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.Navigation}>
      <ul>
        <li>
          <NavLink exact activeClassName={styles.active} to={ROUTES.employees}>Employees</NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Navigation;
