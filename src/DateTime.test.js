import React from 'react'
import ReactDOM from 'react-dom'
import DateTimeDisplay from './DateTime'
import { act } from 'react-testing-library'

describe('<DateTimeDisplay />', function() {
  it('renders without crashing', function() {
    const div = document.createElement('div')
    act(() => {
      ReactDOM.render(<DateTimeDisplay key='something-unique' defValue='' />, div)
    })
    ReactDOM.unmountComponentAtNode(div)
  })
})
