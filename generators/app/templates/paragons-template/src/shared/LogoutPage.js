import * as React from 'react'
import { connect } from 'react-redux'
import { updateAuthenticatedState } from './redux/actions'
import { Redirect, withRouter } from 'react-router-dom'

/**
 * Logout Page
 */
class Logout extends React.Component {

  constructor (props) {
    super(props)

    // logout the user (user profile is also cleared; see reducers.js.userInfo)
    this.props.updateAuthenticatedState(false)
  }

  // ship the user back to the home page...
  render () {
    return <Redirect to="/"/>
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.authenticated,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateAuthenticatedState: (isAuthenticated) => {
      dispatch(updateAuthenticatedState(isAuthenticated))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Logout))

