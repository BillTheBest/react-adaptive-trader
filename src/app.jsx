import 'normalize.css';
import './app.css';
import React from 'react';
import domready from 'domready';
import Main from './main.jsx';

domready(function () {
  var container = document.createElement('div');
  container.class = 'container';
  document.body.appendChild(container);
  React.render(<Main />, container);
});
