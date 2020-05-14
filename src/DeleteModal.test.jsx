import { act, render } from '@testing-library/react'
import DeleteModal from './DeleteModal'
import React from 'react'

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
            <DeleteModal
              MDUrl="http://localhost:8121"
              deleteArgs={{ _id: '11' }}
              object="users"
              rowIndex={1}
              // eslint-disable-next-line react/jsx-no-bind
              updateFunc={() => 'On close update'}
            />
          )).container.firstChild).toBeInstanceOf(HTMLDivElement)
        })
      }
    )
  }
)
