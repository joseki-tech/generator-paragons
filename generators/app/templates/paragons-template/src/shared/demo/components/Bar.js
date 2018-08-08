import * as React from 'react'
import { hot } from 'react-hot-loader'
import * as _ from 'lodash'
import PurePage from '../../PurePage'

/**
 * Bar
 * @memberof Demos
 */

class Bar extends PurePage {

  constructor (props, context) {
    super(props, context, 'Bar')
  }

  render () {
    return <div>{_.toUpper('im big!')}</div>
  }

}

export default hot(module)(Bar)
