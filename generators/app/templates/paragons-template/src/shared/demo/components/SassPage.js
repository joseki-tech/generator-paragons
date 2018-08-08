import * as React from "react"
import styles from './SassPage.scss'
import PurePage from '../../PurePage'

/**
 * @memberof Demos
 */

class SassPage extends PurePage {

    constructor(props, context) {
        super(props, context, 'Sass')
    }

    render() {
        return <div className={styles.myDivColor}>My fancy pants Sass!</div>
    }

}

export default SassPage

