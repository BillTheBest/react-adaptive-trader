import Rx from 'rx'
import React from 'react'

export default class Analytics extends React.Component {
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
        console.log('Analytics loaded')
      })
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

Analytics.propTypes = {
  loaded: React.PropTypes.func.isRequired
}
