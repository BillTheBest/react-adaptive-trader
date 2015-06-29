import React from 'react'

export default class Blotter extends React.Component {
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

Blotter.propTypes = {
  loaded: React.PropTypes.func.isRequired
}
