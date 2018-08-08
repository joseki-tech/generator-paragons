import * as React from 'react'
import MenuBar from './MenuBar'
import SwitchOnChildRoutes from '../../SwitchOnChildRoutes'
import { Panel } from 'react-bootstrap'
import PurePage from '../../PurePage'

/**
 * DemoLayout
 * @memberof Demos
 */

class DemoLayout extends PurePage {

  constructor (props, context) {
    super(props, context, 'Demos', 'Demonstrations')
  }

  render () {
    const {routes} = this.props
    return (
      <div style={{backgroundColor: '#f5f5f5'}}>
        <MenuBar/>
        <Panel style={{
          margin: '5px',
          padding: '8px',
        }}>
          <SwitchOnChildRoutes {...this.props} />
        </Panel>
      </div>
    )
  }
}

export default DemoLayout
