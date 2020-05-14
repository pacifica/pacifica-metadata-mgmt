import DeleteModal from './DeleteModal'
import React from 'react'
import ReactDOM from 'react-dom'
import { act } from '@testing-library/react'

describe(
  '<SimpleModal />',
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
              <DeleteModal
                MDUrl="http://localhost:8121"
                deleteArgs={{ _id: '11' }}
                object="users"
                rowIndex={1}
                // eslint-disable-next-line react/jsx-no-bind
                updateFunc={() => 'On close update'}
              />
            ), div
          )).toBeInstanceOf(React.Component)
        })
        ReactDOM.unmountComponentAtNode(div)
      }
    )
  }
)
