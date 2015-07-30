import React from 'react';
import classNames from 'classnames';
import './layout.less';

export class Right extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div style={{float: 'right'}} {...this.props}>{this.props.children}</div>;
  }
}

export class Left extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div style={{float: 'left'}} {...this.props}>{this.props.children}</div>;
  }
}

export class VerticallyCentered extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let outerClass = classNames(this.props.className, 'vertically-centered-container');
    return (
      <div {...this.props} className={outerClass}>
        <div className='vertically-centered-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export class HorizontallyCentered extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='horizontally-centered-container' {...this.props}>
        <div className='horizontally-centered-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
