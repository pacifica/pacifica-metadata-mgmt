import React from 'react'
import ReactDOM from 'react-dom'
import DynamicTable from './Table'
import { act } from 'react-testing-library'

it('renders without crashing', () => {
  expect.assertions(1)
  const div = document.createElement('div')
  act(() => {
    ReactDOM.render(<DynamicTable MDUrl="http://localhost:8121" object="users" />, div, () => {
      expect(div.querySelector('div.rt-resizable-header-content').textContent).toEqual('ID')
    })
  })
  ReactDOM.unmountComponentAtNode(div)
})
