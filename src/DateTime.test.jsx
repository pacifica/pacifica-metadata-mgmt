import DateTimeDisplay from './DateTime'
import React from 'react'
import ReactDOM from 'react-dom'
import { act } from '@testing-library/react'

describe('<DateTimeDisplay />', () => {
  it('renders without crashing', () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1)
    const div = document.createElement('div')
    act(() => {
      expect(ReactDOM.render(
        (
          <DateTimeDisplay
            defValue=""
            key="something-unique"
          />
        ), div
      )).toBeInstanceOf(React.Component)
    })
    ReactDOM.unmountComponentAtNode(div)
  })
})
