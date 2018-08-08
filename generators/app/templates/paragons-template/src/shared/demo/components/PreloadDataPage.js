import * as React from 'react'
import { storeData } from '../../redux/actions'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import PurePage from '../../PurePage'

/**
 * PreloadDataPage
 * @memberof Demos
 */

class PreloadDataPage extends PurePage {

  constructor (props, context) {
    super(props, context, 'Preload Date Page')
  }

  componentDidMount () {
    !this.props.data && this.props.loadData() // only load the data if not already loaded
  }

  render () {
    return (
      <div>
        <p>The thig to understand here is that the JSON below is immediately
          available on the initial render because it was pre-loaded on the
          server side via a <b>preloadData</b> on the route in <b>routes.js</b>.
          Refresh the page to validate.</p>
        <Panel>
          <code>{JSON.stringify(this.props.data, null, 2)}</code>
        </Panel>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.preloadedData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: () => {
      dispatch(fetchData())
    },
  }
}

const fetchData = () => dispatch =>
  Promise.resolve({foo: 'bar'}).then(data => dispatch(storeData(data)))

export { fetchData }
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true},
)(PreloadDataPage)
