'use strict';

import React from 'react';
import WaitingOverlay from 'components/common/waitingOverlay.jsx';
import { referenceDataService } from 'services/index.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currencyPairs: []
    };
  }

  componentDidMount(){
    referenceDataService.getCurrencyPairUpdatesStream()
      .subscribe(u => {
        this.setState({
          isLoading: false,
          currencyPairs: u.map(c => c.currencyPair)
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <WaitingOverlay />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.currencyPairs.map(c => <div>{c.symbol}</div>)}
        </div>
      );
    }
  }
}
