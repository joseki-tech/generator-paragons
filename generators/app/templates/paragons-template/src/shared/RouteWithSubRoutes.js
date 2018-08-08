import * as React from 'react'
import { Route } from 'react-router-dom'

/**
 * Wrap <Route> and use this everywhere instead, then when sub routes are added
 * to any route it'll work.
 *
 * @param route
 * @returns {*}
 * @constructor
 *
 * @see https://reacttraining.com/react-router/web/example/route-config
 */
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes}/>
    )}
  />
)

export default RouteWithSubRoutes