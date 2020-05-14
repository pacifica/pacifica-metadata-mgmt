import { act, wait } from '@testing-library/react'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

describe(
  '<App />',
  () => {
    it(
      'renders without crashing',
      async () => {
        // eslint-disable-next-line no-magic-numbers
        expect.assertions(1)
        const div = document.createElement('div')
        act(() => {
          ReactDOM.render(
            <App MDUrl="http://localhost:8121" />,
            div
          )
        })
        await wait(() => {
          expect(div.querySelector('#title-text').textContent).toStrictEqual('Pacifica Metadata Management')
        })
        ReactDOM.unmountComponentAtNode(div)
      }
    )
  }
)
