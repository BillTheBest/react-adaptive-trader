import React from 'react'
import Bootstrap from 'react-bootstrap'
import classNames from 'classnames'

export default class CommandButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var visibility = this.props.isBusy ? {} : {className: 'hide'}
    var result = classNames(visibility, 'glyphicon glyphicon-refresh') 
    return (
      <Bootstrap.Button
        bsStyle='primary'
        disabled={!this.props.canExecute || this.props.isBusy}
        onClick={() => this.props.execute()} {...this.props}>
        {this.props.children}
        <span className={result} style={{marginLeft: '5px'}}
      </Bootstrap.Button>
    )
  }
}
CommandButton.propTypes = {
  // a callback to enable the request list to tell the parent that an item has been selected
  canExecute: React.PropTypes.bool,
  execute: React.PropTypes.func,
  isBusy: React.PropTypes.bool
}
CommandButton.defaultProps = {
  isBusy: false,
  canExecute: false
}
