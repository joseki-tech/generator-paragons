import * as React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Link, withRouter } from 'react-router-dom'
import { Button, Col, Grid, Panel, Row } from 'react-bootstrap'
import PurePage from '../../PurePage'

/**
 * @memberof Demos
 */

const styleP = {
  textAlign: 'right',
  margin: '0 0 0px',
  paddingTop: '12px',
}

/**
 * DemoHomePage
 * @memberOf Demos
 */

class DemoHomePage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Demo Home')
  }

  render () {
    const {match} = this.props
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Redux</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates a connected component with Redux action creator and
                a reducer.
                <p style={styleP}>
                  <Link to={`${match.url}/counter`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title
                  componentClass="h3">Internationalization (i18n)</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Shows usage of <a
                href="https://github.com/yahoo/react-intl"
                target="_blank">React-Intl</a> components.
                <p style={styleP}>
                  <Link to={`${match.url}/i18n`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Nested</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Nested links wth React Router v4.
                <p align="right">
                  <Link to={`${match.url}/nested`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Code Splitting (by
                  Route)</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates how to leverage <a
                href="https://github.com/jamiebuilds/react-loadable"
                target="_blank">react-loadable</a> and
                Webpacks <a
                href="https://webpack.js.org/api/module-methods/#import-"
                target="_blank">import()</a> to
                achieve
                code
                splitting by route.
                <p align="right">
                  <Link to={`${match.url}/split`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">SASS Support</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Example Sass usage.
                <p align="right">
                  <Link to={`${match.url}/sass`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Auto Prefixing</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates how the autoprefixer works.
                <p align="right">
                  <Link to={`${match.url}/autoprefixing`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">SSR Data Preload</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates how to pre-loading data on a server side render.
                <p align="right">
                  <Link to={`${match.url}/preload`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Deferred Render (Above The
                  Fold)</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates how to implement deferred component rendering.
                <p align="right">
                  <Link to={`${match.url}/defer`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">SEO</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates how Page Support supports SEO.
                <p align="right">
                  <Link to={`${match.url}/seo`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Error</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates <a
                href="https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html">error
                Handling in React 16</a>.
                <p align="right">
                  <Link to={`${match.url}/error`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            <Panel bsStyle={this.props.authenticated ? 'success' : 'danger'}>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Secured</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates a secured route and exercises the login.
                <p align="right">
                  <Link to={`${match.url}/secure`}>
                    <Button bsStyle="primary" variant="outlined">Demo</Button>
                  </Link>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            {this.props.authenticated ? <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Authenticated
                  Content</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                Demonstrates a how content can be gated by authentication.
              </Panel.Body>
            </Panel> : null}
          </Col>
        </Row>
      </Grid>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionId: state.sessionId,
    authenticated: state.authenticated,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const HomePageConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DemoHomePage)

export default hot(module)(withRouter(HomePageConnected))
