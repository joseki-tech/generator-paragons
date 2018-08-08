import * as React from 'react'
import { hot } from 'react-hot-loader'
import routes from './routes'
import SwitchOnChildRoutes from './SwitchOnChildRoutes'

/**
 * Application harness.
 */
class App extends React.Component {

  render () {
    return (
      <SwitchOnChildRoutes {...this.props} routes={routes}/>
    )
  }

}

export default hot(module)(App)