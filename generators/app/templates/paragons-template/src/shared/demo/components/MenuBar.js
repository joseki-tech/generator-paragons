import * as React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { MenuItem, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

/**
 * MenuBar
 * @memberOf Demos
 */

class MenuBar extends React.PureComponent {

  render () {
    const {match} = this.props
    return (
      <div>
        <Navbar inverse collapseOnSelect style={{marginBottom: '0px'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={`${match.url}`}>
                Paragons
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {/*<NavItem componentClass={Link} href={`${match.url}`}*/}
              {/*to={`${match.url}`}*/}
              {/*eventKey={1}>Home</NavItem>*/}
              <NavDropdown eventKey={2} title="Demos"
                           id="basic-nav-dropdown">
                <MenuItem componentClass={Link} href={`${match.url}/counter`}
                          to={`${match.url}/counter`}
                          eventKey={2.1}>Redux</MenuItem>
                <MenuItem componentClass={Link} href={`${match.url}/i18n`}
                          to={`${match.url}/i18n`}
                          eventKey={2.2}>Internationalization (i18n)</MenuItem>
                <MenuItem componentClass={Link} href={`${match.url}/nested`}
                          to={`${match.url}/nested`}
                          eventKey={2.3}>Nested</MenuItem>
                <MenuItem componentClass={Link} href={`${match.url}/split`}
                          to={`${match.url}/split`} eventKey={2.4}>Code
                  Splitting (by Route)</MenuItem>
                <MenuItem componentClass={Link} href={`${match.url}/sass`}
                          to={`${match.url}/sass`} eventKey={2.5}>SASS
                  Supoort</MenuItem>
                <MenuItem componentClass={Link}
                          href={`${match.url}/autoprefixing`}
                          to={`${match.url}/autoprefixing`} eventKey={2.6}>Auto
                  Prefixing</MenuItem>
                <MenuItem componentClass={Link} href={`${match.url}/preload`}
                          to={`${match.url}/preload`}
                          eventKey={2.7}>Preload</MenuItem>
                <MenuItem componentClass={Link}
                          href={`${match.url}/non-existent-route`}
                          to={`${match.url}/preload`}
                          eventKey={2.8}>Non-existent Route</MenuItem>
                <MenuItem componentClass={Link}
                          href={`${match.url}/non-existent-route`}
                          to={`${match.url}/defer`}
                          eventKey={2.9}>Deferred Render</MenuItem>
                <MenuItem componentClass={Link} href={`${match.url}/seo`}
                          to={`${match.url}/seo`}
                          eventKey={2.10}>SEO</MenuItem>
                <MenuItem componentClass={Link} href={`${match.url}/error`}
                          to={`${match.url}/error`}
                          eventKey={2.11}>Error</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const MenuBarConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuBar)

export default hot(module)(withRouter(MenuBar))
