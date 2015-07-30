import React from 'react';
import {HorizontallyCentered, VerticallyCentered} from './layout.jsx';
import './waitingOverlay.less';

export default class WaitingOverlay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='waiting-overlay' {...this.props}>
        <div>
          <HorizontallyCentered>
            <VerticallyCentered>
              <span style={{fontSize: '2em'}} className='glyphicon glyphicon-refresh glyphicon-spin' />
            </VerticallyCentered>
          </HorizontallyCentered>
        </div>
      </div>
    );
  }
}
