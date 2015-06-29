'use strict'

import React from 'react'
import { priceService } from 'services/index.js'

export default class SpotTile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      price: null
    };
  }

  componentDidMount() {
    var prices = priceService.getPriceStream(this.props.ccyPair)
    // TODO Can't figure out how to put an instance method on an ampersand model..
    // var prices = this.props.ccyPair
    //   .getPriceStream()
    //
    prices.subscribe(p => {
      this.setState({price: p})
    })
  }

  render() {
    let prices;
    if (this.state.price){
      prices = <div>{this.state.price.bid} | {this.state.price.ask}</div>
    }
    return (
      <div>
        {this.props.ccyPair.symbol}<br />
        {prices}
      </div>
    )
  }
}

SpotTile.propTypes = {
  ccyPair: React.PropTypes.object.isRequired
}
