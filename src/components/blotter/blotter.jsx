import Rx from 'rx'
import React from 'react'

export default class Blotter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    Rx.Observable.returnValue({}).delay(200)
      .subscribe(() =>{
        this.setState({isLoading: false})
        this.props.loaded()
        console.log('Blotter loaded')
      })
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

Blotter.propTypes = {
  loaded: React.PropTypes.func.isRequired
}
