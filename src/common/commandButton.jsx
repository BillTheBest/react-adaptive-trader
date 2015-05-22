import React from 'react';
import Bootstrap from 'react-bootstrap';
import Icon from 'react-fa';

export default class CommandButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var spinnerProps = this.props.isBusy ? {} : {className: 'hide'};
    return (
      <Bootstrap.Button
        bsStyle='primary'
        disabled={!this.props.canExecute || this.props.isBusy}
        onClick={() => this.props.execute()} {...this.props}>
        {this.props.children}
        <Icon style={{marginLeft: '5px'}} name="circle-o-notch" spin {...spinnerProps}/>
      </Bootstrap.Button>
    );
  }
}
CommandButton.propTypes = {
  // a callback to enable the request list to tell the parent that an item has been selected
  canExecute: React.PropTypes.bool,
  execute: React.PropTypes.func,
  isBusy: React.PropTypes.bool
};
CommandButton.defaultProps = {
  isBusy: false,
  canExecute: false
};
