import * as React from 'react'

/**
 * {@link https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html|Error Handling in React 16}
 *
 * @see ErrorPage
 */
class ErrorBoundary extends React.Component {

  constructor (props) {
    super(props)
    this.state = {error: null}
  }

  componentDidCatch (error, info) {
    console.error(error, info)
    this.setState({error})
  }

  render () {

    if (!!this.state.error) {
      return <pre style={{color: 'red'}}>{this.state.error.stack}</pre>
    }

    return this.props.children

  }

}

export default ErrorBoundary
