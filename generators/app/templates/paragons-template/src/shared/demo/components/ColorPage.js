import * as React from 'react'
import PurePage from '../../PurePage'

/**
 * ColorPage
 * @memberof Demos
 */
class ColorPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Color Page')
  }

  render () {
    return <div style={{
      backgroundColor: this.props.match.params.color,
      color: 'white',
      textAlign: 'center',
    }}>color</div>
  }

}

export default ColorPage