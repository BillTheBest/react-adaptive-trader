import React from 'react'
import './oneWayPrice.less'

export default class OneWayPrice extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.direction.toUpperCase()}
        <span className='secondary-foreground' style={{fontSize: '18px'}}>{this.props.formattedPrice.bigFigures}</span>
        <span className="primary-foreground pips">{this.props.formattedPrice.pips}</span>
        <span className="secondary-foreground" style={{fontSize: '18px'}}>{this.props.formattedPrice.tenthOfPips}</span>
      </div>
    )
  }
}

OneWayPrice.propTypes = {
  direction: React.PropTypes.string.isRequired,
  formattedPrice: React.PropTypes.object.isRequired
}
