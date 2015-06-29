import 'normalize.css'
import './app.less'
import React from 'react'
import domready from 'domready'
import Main from './main.jsx'

import RxExtensions from './helpers/rxExtensions.js'
RxExtensions.register()

domready(function () {
  var container = document.createElement('div')
  container.class = 'container'
  document.body.appendChild(container)
  React.render(<Main />, container)
})
