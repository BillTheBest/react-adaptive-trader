import React from 'react'
import OneWayPrice from './oneWayPrice.jsx'
import PriceFormatter from 'helpers/PriceFormatter.js'

export default class PricingTile extends React.Component {
  constructor(props) {
    super(props)
    this.formatPrice = this.formatPrice.bind(this);
    this.execute = this.execute.bind(this);
  }

  formatPrice(rate) {
    return PriceFormatter.getFormattedPrice(rate,
      this.props.ccyPair.ratePrecision, this.props.ccyPair.pipsPosition)
  }

  execute(direction, rate) {
    return this.props.onExecute(direction, rate, this.props.price.valueDate)
  }

  render() {
    let prices;
    if (this.props.price) {
      prices = (
        <div>
          <OneWayPrice direction='sell'
                       formattedPrice={this.formatPrice(this.props.price.bid)}
                       onExecute={() => this.execute('sell', this.props.price.bid)} />
          <OneWayPrice direction='buy'
                       formattedPrice={this.formatPrice(this.props.price.ask)}
                       onExecute={() => this.execute('buy', this.props.price.ask)} />
        </div>
      )
    } else {
      prices = <span>Pricing is currently unavailable</span>
    }
    return (
      <div>
        {this.props.ccyPair.symbol}
        {prices}
      </div>
    )
  }
}

PricingTile.propTypes = {
  ccyPair: React.PropTypes.object.isRequired,
  price: React.PropTypes.object
}
