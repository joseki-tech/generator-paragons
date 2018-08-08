import * as React from 'react'
import { withRouter } from 'react-router-dom'

/**
 * Renders when the user clicks a link which does not have a corresponding route.
 */
class NoMatch extends React.PureComponent {
  render () {
    const {match, location, history} = this.props
    return <div>No route for pathname [<b><font
      color="red">{location.pathname}</font></b>]!
    </div>
  }
}

export default withRouter(NoMatch)
