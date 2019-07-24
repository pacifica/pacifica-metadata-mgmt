import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import App from './App'
import { act } from 'react-testing-library'

describe('<App />', () => {
  it('renders without crashing', () => {
    expect.assertions(1)
    const div = document.createElement('div')
    act(() => {
      ReactDOM.render(<App MDUrl="http://localhost:8121" />, div, () => {
        expect(div.querySelector('#title-text').textContent).toEqual('Pacifica Metadata Management')
      })
    })
    ReactDOM.unmountComponentAtNode(div)
  })
})
