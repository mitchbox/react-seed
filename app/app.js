'use strict';

import './favicon.ico';
import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';

import React from 'react';
import App from './components/app/app';

React.render(
  <App />,
  document.getElementById('app')
);
