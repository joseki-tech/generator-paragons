import * as React from 'react'
import PurePage from '../../PurePage'

/**
 * A component that is wrapped in a Loadable.
 *
 * @memberof Demos
 */
class CodeSplitPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Code Split Page', 'Demonstrates Code Splitting')
  }

  render () {
    return <p>So the big deal here is that this component exists in its own
      dedicated chunk which can be pre-loaded on as in this case downloaded on
      demand. If you watch the Network tab of the Developer Tools you will see
      that <b>demo-components-CodeSplitPage.js</b> is requested on demand.</p>
  }

}

export default CodeSplitPage