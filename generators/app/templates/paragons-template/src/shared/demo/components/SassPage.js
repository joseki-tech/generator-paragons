import * as React from 'react'
import styles from './SassPage.scss'
import PurePage from '../../PurePage'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

/**
 * @memberof Demos
 */

class SassPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Sass')
  }

  render () {
    return <div>
      <h6>SassPage.scss</h6>
      <SyntaxHighlighter language='scss' style={docco}>{`
        $color: blue;
        .myDivColor {
          color: $color;
          font-family: cursive;
          text-align: center;
          font-size: xx-large;
        }
        `}
      </SyntaxHighlighter>
      <div className={styles.myDivColor}>My fancy pants Sass!</div>
    </div>
  }

}

export default SassPage

