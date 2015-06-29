import React from 'react'

export default class Analytics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
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
