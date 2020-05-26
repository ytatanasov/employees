import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';

const Layout = ({ children }) => (
  <div data-testid="layoutContainer">
    <Header />
    <main>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
