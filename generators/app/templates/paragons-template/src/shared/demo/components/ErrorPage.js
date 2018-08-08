import * as React from 'react'
import PurePage from '../../PurePage'

/**
 * @memberof Demos
 * @see ErrorBoundary
 */
class ErrorPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Error Demo Page',
      'Induces an error which exercises the ErrorBoundry component.')
  }

  render () {

    if (!require('is-node')) {
      throw new Error('kaboom!')
    }

    return 'The error is induced on the client render...'

  }

}

export default ErrorPage
