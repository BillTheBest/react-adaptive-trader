'use strict'

import React from 'react'
import WaitingOverlay from 'components/common/waitingOverlay.jsx'
import { Layout } from 'lib/react-flex-layout.min.js'

import Analytics from 'components/analytics/analytics.jsx'
import Tiles from 'components/tiles/spotTiles.jsx'
import Blotter from 'components/blotter/blotter.jsx'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isBlotterLoading: true,
      isTilesLoading: true,
      isAnalyticsLoading: true
    }
  }

  isLoading() {
    return this.state.isBlotterLoading ||
           this.state.isTilesLoading ||
           this.state.isAnalyticsLoading
  }

  render() {
    let waitingOverlay
    if (this.isLoading()) {
      waitingOverlay = <WaitingOverlay />
    }
    return (
      <div>
        <Layout fill='window'>
          <Layout layoutWidth='flex'>
            <Layout layoutHeight='flex'>
              <Tiles loaded={() => this.setState({isTilesLoading: false})} />
            </Layout>
            <Layout layoutHeight={100}>
              <Blotter loaded={() => this.setState({isBlotterLoading: false})} />
            </Layout>
          </Layout>
          <Layout layoutWidth={200}>
            <Analytics loaded={() => this.setState({isAnalyticsLoading: false})} />
          </Layout>
        </Layout>
        {waitingOverlay}
      </div>
    )
  }
}
