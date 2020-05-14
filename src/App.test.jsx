import { act, render } from '@testing-library/react'
import App from './App'
import React from 'react'

describe(
  '<App />',
  () => {
    it(
      'renders without crashing',
      () => {
        // eslint-disable-next-line no-magic-numbers
        expect.assertions(1)
        act(() => {
          const component = render((
            <App MDUrl="http://localhost:8121" />
          ))
          expect(component.getByText('Pacifica Metadata Management')).toBeInstanceOf(HTMLHeadingElement)
        })
      }
    )
  }
)
