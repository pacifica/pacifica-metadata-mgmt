import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { act, wait } from '@testing-library/react'

describe('<App />', function() {
  it('renders without crashing', async function () {
    expect.assertions(1)
    const div = document.createElement('div')
    act(() => {
      ReactDOM.render(<App MDUrl="http://localhost:8121" />, div)
    })
    await wait(() => {
      expect(div.querySelector('#title-text').textContent).toEqual('Pacifica Metadata Management')
    })
    ReactDOM.unmountComponentAtNode(div)
  })
})
