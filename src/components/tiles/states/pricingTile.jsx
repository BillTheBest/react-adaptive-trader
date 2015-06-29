import React from 'react'

export default class PricingTile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let prices;
    if (this.props.price){
      prices = <div>{this.props.price.bid} | {this.props.price.ask}</div>
    }
    return (
      <div>
        {this.props.ccyPair.symbol}<br />
        {prices}
      </div>
    )
  }
}
