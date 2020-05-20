import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

/**
 * Leveraged by RouteWithSubRoutes to provide route protection. If the user
 * attempts to access a secured route and they are not authenticated, they
 * will be redirected to login. Upon successful authentication they will then
 * be redirect to the secured route which they were trying to access in the
 * first place.
 */
class AuthWrapper extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {

    const {route, authenticated} = this.props

    // are we dealing with a secure route?
    const secure = !!route.secure

    // deny if secure and not authenticated
    let deny = secure && !authenticated
    if (deny) {
      console.warn(
        `Denying access to path:[${route.path}] because it is secure and the user is NOT authenticated. User will be redirected to the login for authentication and upon success will be redirected back to the original/denied path.`)
    }

    return deny ?
      <Redirect
        to={{
          pathname: '/login',
          state: {deniedPath: route.path},
        }}
      />
      :
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes}/>
        )}
      />
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.authenticated,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthWrapper)

// export default AuthWrapper
