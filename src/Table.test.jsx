import { act, wait } from '@testing-library/react'
import DynamicTable from './Table'
import React from 'react'
import ReactDOM from 'react-dom'

describe(
  '<DynamicTable /> renders',
  () => {
    it(
      'renders without crashing',
      async () => {
        // eslint-disable-next-line no-magic-numbers
        expect.assertions(1)
        const div = document.createElement('div')
        act(() => {
          ReactDOM.render(
            (
              <DynamicTable
                MDUrl="http://localhost:8121"
                object="users"
              />
            ), div
          )
        })
        await wait(() => {
          expect(div.querySelector('div.rt-resizable-header-content').textContent).toStrictEqual('ID')
        })
        ReactDOM.unmountComponentAtNode(div)
      }
    )
  }
)
