import Rx from 'rx'
import React from 'react'
import './blotter.less'
import { blotterService } from 'services/index.js'
import BlotterRow from './blotterRow.jsx';

export default class Blotter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      trades: []
    }

    this._blotterStream = new Rx.SingleAssignmentDisposable()
  }

  componentDidMount() {
    let loadedStream = blotterService
      .getTradesStream()
      .take(1)
      .subscribe(trades => {
        this.setState({isLoading: false, trades: trades})
        this.props.loaded()
      })

    let tradesStream = blotterService
      .getTradesStream()
      .skip(1)
      .subscribe(trades => {
        this.setState({ trades: trades.concat(this.state.trades)})
      })

    this._blotterStream.setDisposable(
      new Rx.CompositeDisposable(loadedStream, tradesStream)
    )
  }

  componentWillUnmount() {
    this._blotterStream.dispose()
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
            {this.state.trades.map(t => <BlotterRow key={t.tradeId} row={t} />) }
          </tbody>
        </table>
      </div>
    )
  }
}

Blotter.propTypes = {
  loaded: React.PropTypes.func.isRequired
}
