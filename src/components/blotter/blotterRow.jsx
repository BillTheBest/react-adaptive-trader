import React from 'react'
import './blotter.less'

export default class BlotterRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
	var decoration = this.props.row.tradeStatus === 'rejected' ? 'line-through' : ''
	var left = { textAlign: 'left', padding: '2px 10px', textDecoration: decoration }
	var right = {fontWeight: 700, textAlign: 'right', padding: '2px 10px', textDecoration: decoration}
	return (
		<tr style={{borderBottom: '1px dashed #E8E9EA'}} key={this.props.row.tradeId}>
			<td width='200px' style={left}>{this.props.row.tradeId}</td>
			<td width='200px' style={left}>{this.props.row.tradeDate}</td>
			<td width='100px' style={{fontWeight: 700, textAlign: 'center', padding: '2px 10px', textDecoration: decoration}}>{this.props.row.direction}</td>
			<td width='100px' style={{fontWeight: 700, textAlign: 'left', padding: '2px 10px', textDecoration: decoration}}>{this.props.row.currencyPair}</td>
			<td width='200px' style={right}>{this.props.row.notional}</td>
			<td width='100px' style={right}>{this.props.row.spotRate}</td>
			<td width='100px' style={left}>{this.props.row.tradeStatus}</td>
			<td width='200px' style={{textAlign: 'center', padding: '2px 10px', textDecoration: decoration}}>{this.props.row.valueDate}</td>
			<td width='150px' style={left}>{this.props.row.traderName}</td>
		</tr>);
  }
}

BlotterRow.propTypes = {
  row: React.PropTypes.object.isRequired
}
