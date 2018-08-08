import * as React from 'react'
import PurePage from '../../PurePage'
import PageSupport from '../../PageSupport'
import { Table } from 'react-bootstrap'
import reactElementToJSXString from 'react-element-to-jsx-string'

/**
 * SEOPage
 * @memberof Demos
 */

class SEOPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'SEO Demo Page', 'Let\'s see how this works ... 🤞')
    const pageSupport = PageSupport.getInstance()
    pageSupport.addKeywords('foo, bar')
    pageSupport.addRobotDirectives('nofollow')
  }

  display = component => <pre style={{border: 'none'}}>{reactElementToJSXString(
    component, {sortProps: false})}</pre>

  render () {
    const pageSupport = PageSupport.getInstance()
    return (
      <div>
        <h1>Page Support</h1>
        <Table bordered condensed hover>
          <thead>
          <tr>
            <td><b>Meta</b></td>
            <td><b>Value</b></td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Title</td>
            <td>
              {this.display(pageSupport.buildTitle())}
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{this.display(pageSupport.buildMetaDescription())}</td>
          </tr>
          <tr>
            <td>Keywords</td>
            <td>{this.display(pageSupport.buildMetaKeywords())}</td>
          </tr>
          <tr>
            <td>Robots</td>
            <td>{this.display(pageSupport.buildMetaRobotDirectives())}</td>
          </tr>
          </tbody>
        </Table>
      </div>
    )

  }

}

export default SEOPage
