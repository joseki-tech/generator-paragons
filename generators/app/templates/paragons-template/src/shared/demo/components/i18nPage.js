import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
  intlShape,
} from 'react-intl'
import { Table } from 'react-bootstrap'
import PurePage from '../../PurePage'

/**
 * i18nPage
 * @memberof Demos
 */

class i18nPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'i18n', 'Demonstrates i18n capabilities')
  }

  render () {

    const {messages} = this.props.intl

    return <div>
      <p>Demonstration page for some of the <a target="_blank"
                                               href="https://github.com/yahoo/react-intl/wiki/Components">React
        Intl Components</a></p>
      <p>I believe your locale to be <b>{this.props.locale}</b> and your
        language is <b>{this.props.language}</b>
      </p>
      <h1>Example Usages</h1>
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <td><b>Case</b></td>
          <td><b>Output</b></td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Standard FormattedMessage</td>
          <td><FormattedMessage
            id='greeting'
            description='Greeting to welcome the user to the app'
            values={{
              name: 'Dan',
            }}/></td>
        </tr>
        <tr>
          <td>FormattedMessage with html!</td>
          <td><FormattedMessage
            id='greeting'
            description='Rich text formatting'
            defaultMessage='Hello, {name}! (default)'
            values={{
              name: <b><font color="blue">World</font></b>,
            }}/>
          </td>
        </tr>
        <tr>
          <td>FormattedMessage defaulting due to non existent key!</td>
          <td><FormattedMessage
            id='non-existant-id'
            description='Demonstrating the defaulting for an unknown key'
            defaultMessage='Hello, {name}! (default)'
            values={{
              name: 'World',
            }}/>
          </td>
        </tr>
        <tr>
          <td>FormattedDate</td>
          <td><FormattedDate
            value={new Date()}
            year='numeric'
            month='long'
            day='2-digit'/>
          </td>
        </tr>
        <tr>
          <td>FormattedNumber</td>
          <td><FormattedNumber value={1000}/>
          </td>
        </tr>
        </tbody>
      </Table>
      <h1>Translations</h1>
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <td><b>Id</b></td>
          <td><b>Message</b></td>
        </tr>
        </thead>
        <tbody>
        {Object.keys(messages).map((item) => (
          <tr key={item}>
            <td>{item}</td>
            <td>{messages[item]}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    locale: state.locale,
    language: state.language,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

i18nPage.propTypes = {
  intl: intlShape.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(i18nPage))
