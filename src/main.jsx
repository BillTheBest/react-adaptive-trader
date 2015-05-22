'use strict';

import React from 'react';
import Loading from './loading.jsx';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
  }

  render() {
    return <div>
      <Loading />
    </div>;
  }
}
