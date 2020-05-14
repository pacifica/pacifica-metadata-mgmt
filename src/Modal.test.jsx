import EditIcon from '@material-ui/icons/Edit'
import React from 'react'
import ReactDOM from 'react-dom'
import SimpleModal from './Modal'
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
              <SimpleModal
                MDUrl="http://localhost:8121"
                // eslint-disable-next-line react/jsx-no-bind
                closeUpdate={() => 'On close update'}
                defaults={{}}
                // eslint-disable-next-line react/jsx-no-bind
                icon={() => (<EditIcon />)}
                object="keys"
                title="Some Modal Title"
              />
            ), div
          )).toBeInstanceOf(React.Component)
        })
        ReactDOM.unmountComponentAtNode(div)
      }
    )
  }
)
