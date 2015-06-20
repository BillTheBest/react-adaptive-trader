'use strict';

import React from 'react';
import WaitingOverlay from 'components/common/waitingOverlay.jsx';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <WaitingOverlay />
      </div>
    );
  }
}
