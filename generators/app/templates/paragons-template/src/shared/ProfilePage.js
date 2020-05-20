import * as React from 'react'
import { connect } from 'react-redux'
import { updateAuthenticatedState } from './redux/actions'
import { withRouter } from 'react-router-dom'
import { Col, Grid, Panel, Row } from 'react-bootstrap'

/**
 * Profile Page. Simply dumps the user profile as JSON into a panel. I'm
 * positive you can make it much sexier!
 */
class Profile extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={8} md={8}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Profile
                  Information</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <p>Just dumping the user information as JSON for now...</p>
                <pre>
              {JSON.stringify(this.props.userInfo, undefined, 2)}
              </pre>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.authenticated,
    userInfo: state.userInfo,
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
)(withRouter(Profile))

