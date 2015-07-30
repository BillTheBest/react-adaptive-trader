import React from 'react';

export default class ErrorTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <div>ERROR</div>
        </div>
        <div style={{fontSize: '16px'}}>
          <span style={{color:'#e8c0bb'}} className="secondary-foreground">{this.props.errorMessage}</span>
        </div>
      </div>
    );
  }
}

ErrorTile.propTypes = {
  errorMessage: React.PropTypes.string.isRequired
};
