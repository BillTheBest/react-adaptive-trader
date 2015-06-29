'use strict'

import React from 'react'
import { priceService } from 'services/index.js'

import PricingTile from './states/pricingTile.jsx'
import StaleTile from './states/staleTile.jsx'

export default class SpotTile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      price: null,
      isStale: false
    };

    this.executeTrade = this.executeTrade.bind(this)
  }

  executeTrade(direction, rate, valueDate) {

  }

  componentDidMount() {
    var prices = priceService.getPriceStream(this.props.ccyPair)
    // TODO Can't figure out how to put an instance method on an ampersand model..
    // var prices = this.props.ccyPair
    //   .getPriceStream()
    //
    prices.subscribe(p => {
      if (p.isStale){
        this.setState({price: null, isStale: true})
      } else{
        this.setState({price: p.update, isStale: false})
      }
    })
  }

  render() {
    if (this.state.isStale) {
      return <StaleTile />
    }

    // todo should ccypair be context?
    return <PricingTile onExecute={this.executeTrade}
                        ccyPair={this.props.ccyPair}
                        price={this.state.price} />
  }
}

SpotTile.propTypes = {
  ccyPair: React.PropTypes.object.isRequired
}
