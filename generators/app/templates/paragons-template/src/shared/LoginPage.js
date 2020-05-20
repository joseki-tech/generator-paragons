import * as React from 'react'
import { connect } from 'react-redux'
import { storeUserInfo, updateAuthenticatedState } from './redux/actions'
import { Redirect, withRouter } from 'react-router-dom'
import * as _ from 'lodash'
import {
  Alert,
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  Modal,
  Row,
} from 'react-bootstrap'
import * as md5 from 'md5'

/**
 * Login Page
 */
class LoginPage extends React.Component {

  constructor (props) {
    super(props)

    // capture the denied path to state so we can redirect to it later
    this.state = {
      userid: '',
      password: '',
      authSuccessPath: _.get(props.location.state, 'deniedPath', '/'), // default to home
    }
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleUseridChange = (e) => {
    this.setState({userid: e.target.value})
  }

  handleLogin = (e) => {

    const {userid, password} = this.state
    const passwordHash = md5(password)

    // make rest auth call here (faking with a promise)
    new Promise((resolve, reject) => {
      setTimeout(
        () => {

          // simulate failure
          if (userid == 'fail') {
            reject('simulating failure')
          }

          // simulate success
          else {

            // HOOK IN CALL TO BACKEND HERE (pass along the userid and the
            // password hash; never the clear text password!)
            console.info(
              `authenticating userid:[${userid}] and password hash:[${passwordHash}]...`)

            // usually we would get back user profile info but let's just fake something
            let userInfo = {
              userid, username: _.capitalize(userid),
              email: `${userid}@somewhere.com`,
            }
            resolve(userInfo)
          }
        },
        300)
    }).then((userInfo) => {

      console.log(`AUTHENTICATION SUCCESS: userInfo:[${userInfo}]`)

      // mark authenticated
      this.props.updateAuthenticatedState(true)

      // push the user profile into the redux store
      this.props.storeUserInfo(userInfo)

      // redirect to home or the initially denied path
      let {authSuccessPath} = this.state
      console.log(
        `User has successfully authenticated. Redirecting to:[${authSuccessPath}]`)
      this.props.history.replace(authSuccessPath)

    }).catch((errorMsg) => {
      console.error(`AUTHENTICATION FAILURE: ${errorMsg}`)
      this.setState({errorMsg})
    })

  }

  render () {
    const {authenticated} = this.props
    return !authenticated ?
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              {this.state.errorMsg ?
                <Row>
                  <Col xs={8} md={6}>
                    <Alert bsStyle="danger">
                      {this.state.errorMsg}
                    </Alert>
                  </Col>
                </Row> : ''}
              <Row className="show-grid">
                <Col xs={6} md={4}>
                  <Form horizontal>
                    <FormGroup controlId="formHorizontalUserid">
                      <Col componentClass={ControlLabel} sm={3}>
                        Userid
                      </Col>
                      <Col sm={9}>
                        <FormControl
                          type="userid"
                          value={this.state.userid}
                          placeholder="Userid"
                          onChange={this.handleUseridChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                      <Col componentClass={ControlLabel} sm={3}>
                        Password
                      </Col>
                      <Col sm={9}>
                        <FormControl
                          type="password"
                          value={this.state.password}
                          placeholder="Password"
                          onChange={this.handlePasswordChange}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={2} sm={10}>
                        <Button onClick={this.handleLogin}>Sign
                          in</Button>
                      </Col>
                    </FormGroup>
                  </Form></Col>
              </Row>
            </Grid>
          </Modal.Body>
        </Modal.Dialog>
      </div> :
      <Redirect to={this.state.authSuccessPath}/>
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
    }, storeUserInfo: (userInfo) => {
      dispatch(storeUserInfo(userInfo))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoginPage))

