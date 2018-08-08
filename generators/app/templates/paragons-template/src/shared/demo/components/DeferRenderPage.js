import * as React from 'react'
import DeferRender from '../../DeferRender'
import { ProgressBar } from 'react-bootstrap'
import PurePage from '../../PurePage'

/**
 * DeferRenderPage
 * @memberof Demos
 */

class DeferRenderPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Defer Render')
  }

  refreshPage = () => window.location.reload()

  render () {

    return (
      <div>
        <p>This content is <b>above</b> the fold so it is rendered immediately.
          The content <b>below</b> the fold will render 5 seconds later ...
        </p>

        <div style={{
          textAlign: 'center',
          borderTop: '1px solid black',
          margin: '60px',
        }}>
          <div style={{
            display: 'inline-block',
            position: 'relative',
            top: '-10px', backgroundColor: 'white',
            padding: '0px 10px',
          }}>the fold
          </div>
        </div>

        <DeferRender
          delay={5000}
          loading={({initialDelay, remainingDelay, elapsedTime}) => <ProgressBar
            max={initialDelay / 1000}
            now={Math.round(remainingDelay / 1000)}
            label={Math.round(
              remainingDelay / 1000)}/>}>
          <div style={{textAlign: 'center'}}><b>Oh look some defered
            content!</b>&nbsp;(<a href="#" onClick={this.refreshPage}>let's see
            that
            again</a>)
          </div>
        </DeferRender>
      </div>
    )
  }

}

export default DeferRenderPage
