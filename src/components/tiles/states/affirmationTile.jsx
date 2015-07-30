import React from 'react';

export default class AffirmationTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var affirmation = this.props.tradeDetails
    var textDecoration = affirmation.rejected ? 'line-through' : ''
    return (
      <div>
        <div>
          <div style={{display: 'inline-block'}}>{affirmation.currencyPair}</div>
        </div>
        <div style={{fontSize: '16px'}}>
          <span style={{ 'textDecoration': textDecoration, color: 'white' }}>
            <span className="secondary-foreground">{affirmation.direction === 'buy' ? 'Bought' : 'Sold'} </span>
            <span className="primary-foreground">{affirmation.dealtCurrency} </span>
            <span className="primary-foreground">{affirmation.notional} </span>
            <br />
            <span className="secondary-foreground">vs </span>
            <span className="primary-foreground">{affirmation.otherCurrency} </span>
            <span className="secondary-foreground">at </span>
            <span className="primary-foreground">{affirmation.spotRate} </span>
          </span>
          <br />
          <span className="secondary-foreground">Spot </span>
          <span className="primary-foreground">{affirmation.valueDate} </span>
          <br />
          <span className="secondary-foreground">Trade ID </span>
          <span className="primary-foreground">{affirmation.tradeId} </span>
        </div>
        <div style={{textAlign: 'right'}}>
          <a onClick={this.props.done} className='done-link'>Done</a>
        </div>
      </div>
    );
  }
}

AffirmationTile.propTypes = {
  tradeDetails: React.PropTypes.object.isRequired,
  done: React.PropTypes.func.isRequired
};
