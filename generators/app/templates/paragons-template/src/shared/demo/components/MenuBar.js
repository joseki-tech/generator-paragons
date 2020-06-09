import * as React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import {
  ButtonToolbar, Dropdown,
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

/**
 * MenuBar
 * @memberOf Demos
 */

class MenuBar extends React.Component {

  render () {
    const {match} = this.props
    return (
      <Navbar>
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
          <Navbar.Text style={{float: 'right'}}>
            {this.props.authenticated ?
              <ButtonToolbar>
                <Dropdown id="dropdown-custom-1">
                  <Dropdown.Toggle>
                    <svg className="bi bi-person-fill" width="1em" height="1em"
                         viewBox="0 0 16 16" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"/>
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="super-colors">
                    <MenuItem eventKey="1"><Link to="/profile">View Profile</Link></MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4"><Link to="/logout">Log Out</Link></MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonToolbar>
              : <Link to="/login">login</Link>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
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

const MenuBarConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuBar)

export default hot(module)(withRouter(MenuBarConnected))
