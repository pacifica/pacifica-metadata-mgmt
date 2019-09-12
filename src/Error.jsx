import PropTypes from 'prop-types'
import React from 'react'

class ErrorBoundary extends React.Component {
  static propTypes = {
    'children': PropTypes.element
  }

  static defaultProps = {
    'children': null
  }

  constructor (props) {
    super(props)
    this.state = { 'error': null, 'errorInfo': null }
  }

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate () {
    return false
  }

  componentDidCatch (error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
  }

  render () {
    const { errorInfo, error } = this.state
    const { children } = this.props
    if (errorInfo) {
      return (
        <div>
          <h2>
            {'Something went wrong.'}
          </h2>
          <details style={{ 'whiteSpace': 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
