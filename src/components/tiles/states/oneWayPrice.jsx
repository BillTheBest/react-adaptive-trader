import React from 'react'
import './oneWayPrice.less'
import classnames from 'classnames'

export default class OneWayPrice extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var classes = classnames('one-way-price', { 'one-way-price-enabled': this.props.enabled !== false })
    return (
      <div className={classes} onClick={this.props.onExecute}>
        <div>{this.props.direction.toUpperCase()}</div>
        <span className='secondary-foreground' style={{fontSize: '18px'}}>{this.props.formattedPrice.bigFigures}</span>
        <span className="primary-foreground pips">{this.props.formattedPrice.pips}</span>
        <span className="secondary-foreground" style={{fontSize: '18px'}}>{this.props.formattedPrice.tenthOfPips}</span>
      </div>
    )
  }
}

OneWayPrice.propTypes = {
  direction: React.PropTypes.string.isRequired,
  formattedPrice: React.PropTypes.object.isRequired,
  onExecute: React.PropTypes.func.isRequired,
  enabled: React.PropTypes.bool
}
