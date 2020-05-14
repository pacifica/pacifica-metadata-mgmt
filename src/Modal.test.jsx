import { act, render } from '@testing-library/react'
import React from 'react'
import SimpleModal from './Modal'

describe(
  '<SimpleModal />',
  () => {
    it(
      'renders without crashing',
      () => {
        // eslint-disable-next-line no-magic-numbers
        expect.assertions(1)
        act(() => {
          expect(render((
            <SimpleModal
              MDUrl="http://localhost:8121"
              // eslint-disable-next-line react/jsx-no-bind
              closeUpdate={() => 'On close update'}
              defaults={{}}
              object="keys"
              title="Some Modal Title"
            />
          )).container.firstChild).toBeInstanceOf(HTMLDivElement)
        })
      }
    )
  }
)
