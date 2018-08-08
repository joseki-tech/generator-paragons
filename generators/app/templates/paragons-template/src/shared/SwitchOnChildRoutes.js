import * as React from 'react'
import RouteWithSubRoutes from './RouteWithSubRoutes'
import { Route, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'

/**
 * Renders a {@link https://reacttraining.com/react-router/web/api/Switch|Switch}
 * with the routes child routes.
 */
class SwitchOnChildRoutes extends React.Component {
  render () {
    const {routes} = this.props
    return (
      <Switch>
        {!!routes ? routes.map(
          (route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />
          },
        ) : ''}
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default SwitchOnChildRoutes