import ErrorBoundry from './Error'
import React from 'react'
import ReactDOM from 'react-dom'
import { act } from '@testing-library/react'

describe(
  '<ErrorBoundry />',
  () => {
    it(
      'renders without crashing',
      () => {
        // eslint-disable-next-line no-magic-numbers
        expect.assertions(1)
        const div = document.createElement('div')
        act(() => {
          expect(ReactDOM.render(
            (
              <ErrorBoundry key="something-unique">
                <div />
              </ErrorBoundry>
            ), div
          )).toBeInstanceOf(React.Component)
        })
        ReactDOM.unmountComponentAtNode(div)
      }
    )
  }
)
