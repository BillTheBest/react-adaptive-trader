import React from 'react'
import './directionIndicator.less'

export default class DirectionIndicator extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var direction = this.props.direction
    var up = direction === 'up' ? <div className="arrow-up"></div> : null
    var down = direction === 'down' ? <div className="arrow-down"></div> : null
    return (
      <div className='direction-indicator'>
        <div style={{height: '30%'}}>{up}</div>
        <div style={{height: '40%'}}>
          <span className="primary-foreground" style={{fontSize: '16px', margin: '3px'}}>
            {this.props.formattedSpread}
          </span>
        </div>
        <div style={{height: '30%'}}>{down}</div>
      </div>
    )
  }
}

DirectionIndicator.propTypes = {
  formattedSpread: React.PropTypes.string.isRequired,
  direction: React.PropTypes.string.isRequired
}
