import React from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundry from './Error'
import { act } from '@testing-library/react'

describe('<ErrorBoundry />', function() {
  it('renders without crashing', function() {
    const div = document.createElement('div')
    act(() => {
      ReactDOM.render(<ErrorBoundry key='something-unique'><div /></ErrorBoundry>, div)
    })
    ReactDOM.unmountComponentAtNode(div)
  })
})
