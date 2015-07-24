import React from 'react'
import OneWayPrice from './oneWayPrice.jsx'
import DirectionIndicator from './directionIndicator.jsx'

export default class PricingTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movementDirection: ''
    }
    this.execute = this.execute.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.price) {
      if (nextProps.price.mid > this.props.price.mid) {
        this.setState({movementDirection: 'up'})
      }
      else if (nextProps.price.mid < this.props.price.mid) {
        this.setState({movementDirection: 'down'})
      }
      else {
        this.setState({movementDirection: ''})
      }
    }
  }

  execute(direction, rate) {
    return this.props.onExecute(direction, rate, this.props.price.valueDate)
  }

  render() {
    let prices

    if (this.props.price) {
      prices = (
        <div>
          <OneWayPrice direction='sell'
                       formattedPrice={this.props.price.formattedBid}
                       onExecute={() => this.execute('sell', this.props.price.bid)}>
          </OneWayPrice>
          <DirectionIndicator direction={this.state.movementDirection}
                              formattedSpread={this.props.price.formattedSpread}></DirectionIndicator>
          <OneWayPrice direction='buy'
                       formattedPrice={this.props.price.formattedAsk}
                       onExecute={() => this.execute('buy', this.props.price.ask)}>
          </OneWayPrice>
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
