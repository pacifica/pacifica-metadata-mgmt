import { act, render } from '@testing-library/react'
import DateTimeDisplay from './DateTime'
import React from 'react'

describe(
  '<DateTimeDisplay />',
  () => {
    it(
      'renders without crashing',
      () => {
        // eslint-disable-next-line no-magic-numbers
        expect.assertions(1)
        act(() => {
          expect(render((
            <DateTimeDisplay
              defValue=""
              key="something-unique"
            />
          )).container.firstChild).toBeInstanceOf(HTMLDivElement)
        })
      }
    )
  }
)
