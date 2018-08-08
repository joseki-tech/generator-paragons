import * as React from 'react'
import { connect } from 'react-redux'
import { updateCount } from '../../redux/actions'
import { Button } from 'react-bootstrap'
import PurePage from '../../PurePage'

const IS_NODE = require('is-node')

/**
 * CounterPage
 * @memberof Demos
 */

class CounterPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Counter')
    this.state = {}
  }

  componentDidMount () {
    const interval = setInterval(
      () => this.props.updateCount(this.props.count + 1), 1000)
    this.setState({interval: interval})

  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  handleReset = (e) => {
    this.props.reset()
  }

  render () {
    return (
      <div>
        <p><b>CounterPage</b> is <i>connected</i> component. On
          <i>componentDidMount</i> an interval is created which updates the
          count via a Redux action creator.</p>
        <Button bsStyle="primary" variant="outlined"
                onClick={this.handleReset}>Reset</Button>&nbsp;{this.props.count}
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.count,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCount: (count) => {
      dispatch(updateCount(count))
    },
    reset: () => {
      dispatch(updateCount(0))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterPage)

