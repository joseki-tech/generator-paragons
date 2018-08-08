import * as React from 'react'
import PropTypes from 'prop-types'

/**
 * Defers the rendering of its children. The delay can be set via the "delay"
 * property and you can display a custom loading message via the "loading"
 * property.
 */
class DeferRender extends React.Component {

  constructor (props) {
    super(props)
    this.startTime = new Date().getTime()
    this.state = {
      skipRender: true,
      delay: this.props.delay,
      elapsedTime: 0,
      remainingDelay: this.props.delay,
    }
  }

  /**
   * Since componentDidMount only gets invoked on the client side and not on
   * the server side, the skip render gate will only get tripped on the client
   * side. Therefore there is no chance that the render will be available for
   * the SSR.
   */
  componentDidMount () {
    const interval = setInterval(() => {
      const elapsedTime = new Date().getTime() - this.startTime
      const remainingDelay = this.props.delay - elapsedTime
      this.setState({
        elapsedTime,
        remainingDelay,
      })
    }, 500)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      clearTimeout(timeout)
      this.setState({
        skipRender: false,
      })
    }, this.state.delay)
  }

  render () {
    let ret = null
    if (this.state.skipRender) {
      if (!!this.props.loading) {
        ret = <this.props.loading initialDelay={this.props.delay}
                                  elapsedTime={this.state.elapsedTime}
                                  remainingDelay={this.state.remainingDelay}/>
      }
    }
    else {
      ret = this.props.children
    }
    return ret
  }

}

DeferRender.propTypes = {
  loading: PropTypes.func,
  delay: PropTypes.number,
}

DeferRender.defaultProps = {
  delay: 0,
  loading: null,
}

export default DeferRender
