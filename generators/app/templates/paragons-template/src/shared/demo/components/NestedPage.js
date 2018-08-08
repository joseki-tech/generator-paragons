import * as React from 'react'
import { Link } from 'react-router-dom'
import RouteWithSubRoutes from '../../RouteWithSubRoutes'
import PurePage from '../../PurePage'

/**
 * NestedPage
 * @memberOf Demos
 */

class NestedPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Nested Page')
  }

  render () {
    const {match} = this.props
    return <div>
      <p>The following routes are defined and rendered within this
        component.</p>
      <ul>
        <li>
          <Link to={`${match.url}/red`}>Go Red</Link>
        </li>
        <li>
          <Link to={`${match.url}/blue`}>Go Blue</Link>
        </li>
      </ul>

      {this.props.routes.map(
        (route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
  }
}

export default NestedPage

