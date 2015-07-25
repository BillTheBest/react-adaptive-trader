import React from 'react'
import './blotter.less'
import { blotterService } from 'services/index.js'

export default class Blotter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      trades: []
    }
    this.tradesReceived = this.tradesReceived.bind(this)
  }

  componentDidMount() {
    blotterService
      .getTradesStream()
      .subscribe(this.tradesReceived)
  }

  tradesReceived(trades) {
    var newTrades = trades.concat(this.state.trades)
    this.setState({isLoading: false, trades: newTrades})
    this.props.loaded()
  }

  render() {
    return (
      <div id='blotter-area'>
        <table>
          <thead>
            <tr>
              <th style={{width:'200px', textAlign: 'left', padding: '0 10px'}}>ID</th>
              <th style={{width:'200px', textAlign: 'left', padding: '0 10px'}}>Date</th>
              <th style={{width:'100px', textAlign: 'center', padding: '2px 10px'}}>Dir.</th>
              <th style={{width:'100px', textAlign: 'left', padding: '2px 10px'}}>CCY</th>
              <th style={{width:'200px', textAlign: 'right', padding: '2px 10px'}}>Notional</th>
              <th style={{width:'100px', textAlign: 'right', padding: '2px 10px'}}>Rate</th>
              <th style={{width:'100px', textAlign: 'left', padding: '2px 10px'}}>Status</th>
              <th style={{width:'200px', textAlign: 'center', padding: '2px 10px'}}>Value Date</th>
              <th style={{width:'150px', textAlign: 'left', padding: '2px 10px'}}>Trader</th>
            </tr>
          </thead>
          <tbody>
            {this.state.trades.map(t => {
              var decoration = t.tradeStatus === 'rejected' ? 'line-through' : ''
              var left = { textAlign: 'left', padding: '2px 10px', textDecoration: decoration }
              var right = {fontWeight: 700, textAlign: 'right', padding: '2px 10px', textDecoration: decoration}
              return (
                <tr style={{borderBottom: '1px dashed #E8E9EA'}} key={t.tradeId}>
                  <td width='200px' style={left}>{t.tradeId}</td>
                  <td width='200px' style={left}>{t.tradeDate}</td>
                  <td width='100px' style={{fontWeight: 700, textAlign: 'center', padding: '2px 10px', textDecoration: decoration}}>{t.direction}</td>
                  <td width='100px' style={{fontWeight: 700, textAlign: 'left', padding: '2px 10px', textDecoration: decoration}}>{t.currencyPair}</td>
                  <td width='200px' style={right}>{t.notional}</td>
                  <td width='100px' style={right}>{t.spotRate}</td>
                  <td width='100px' style={left}>{t.tradeStatus}</td>
                  <td width='200px' style={{textAlign: 'center', padding: '2px 10px', textDecoration: decoration}}>{t.valueDate}</td>
                  <td width='150px' style={left}>{t.traderName}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

Blotter.propTypes = {
  loaded: React.PropTypes.func.isRequired
}
