'use strict'

import React from 'react'
import { priceService, executionService } from 'services/index.js'

import PricingTile from './states/pricingTile.jsx'
import StaleTile from './states/staleTile.jsx'

import './spotTile.less'

export default class SpotTile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      price: null,
      isStale: false,
      executingPrice: null,
      notional: 1000000
    }

    this.executeTrade = this.executeTrade.bind(this)
    this.handleExecuteResult = this.handleExecuteResult.bind(this)
    this.executionFailed = this.executionFailed
  }

  executeTrade(direction, rate, price) {
    this.setState({executingPrice: price})
    executionService
      .executeRequest(
        this.props.ccyPair.symbol,
        this.props.ccyPair.baseCurrency,
        direction, rate, price.valueDate,
        this.state.notional
      )
      .subscribe(this.handleExecuteResult, this.executionFailed)
  }

  handleExecuteResult() {

  }

  executionFailed() {

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
    var content

    if (this.state.executingPrice) {
      content = <PricingTile onExecute={this.executeTrade}
                             ccyPair={this.props.ccyPair}
                             price={this.state.executingPrice}
                             isExecuting={true} />
    } else if (this.state.isStale) {
      content = <StaleTile />
    } else {
      // todo should ccypair be context?
      content = <PricingTile onExecute={this.executeTrade}
                             ccyPair={this.props.ccyPair}
                             price={this.state.price} />
    }

    return (
      <div style={{height: '100%', width: '100%' }}>
        {content}
      </div>
    )
  }
}

SpotTile.propTypes = {
  ccyPair: React.PropTypes.object.isRequired
}
