import * as React from 'react'
import styles from './AutoprefixingPage.scss'
import PurePage from '../../PurePage'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

/**
 * Demonstrates how the CSS animation properties are auto prefixed.
 * */
class AutoPrefixingPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Sass')
  }

  render () {
    return <div>
      <p>
        Demonstrates how the CSS class properties are auto prefixed.
        Specifically in this example(borrowed from <a
        href="https://www.w3schools.com/css/css3_animations.asp">W3Schools CSS
        Animations</a>) we are focusing on the the animation
        properties...
        <div className={styles.myDivAnimation}>I transition from red to
          yellow and then pop red.</div>
        <h6>Before:</h6>
        <SyntaxHighlighter language='css' style={docco}>{`
        .myDivAnimation {
          width: 100px;
          height: 100px;
          background-color: red;
          animation-name: example;
          animation-duration: 4s;
        }
        `}
        </SyntaxHighlighter>
        <h6>After:</h6>
        <SyntaxHighlighter language='css' style={docco}>{`
        ._1FV313lpHmf9pVn4gCxZvJ {
          width: 100px;
          height: 100px;
          background-color: red;
          -webkit-animation-name: cdxXG6F1dT2XIenM_UW1p;
          animation-name: cdxXG6F1dT2XIenM_UW1p;
          -webkit-animation-duration: 4s;
          animation-duration: 4s;
        }
        `}
      </SyntaxHighlighter>
      </p>
    </div>
  }

}

export default AutoPrefixingPage



