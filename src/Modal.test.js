import React from 'react'
import ReactDOM from 'react-dom'
import EditIcon from '@material-ui/icons/Edit'
import SimpleModal from './Modal'
import { act } from 'react-testing-library'

describe('<SimpleModal />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    act(() => {
      ReactDOM.render(<SimpleModal
        title="Some Modal Title"
        icon={() => { return (<EditIcon />) }}
        MDUrl="http://localhost:8121"
        object="keys"
        defaults={{}}
        closeUpdate={() => {
          console.log('Closed Modal')
        }}
        MDUrl="http://localhost:8121" />, div)
    })
    ReactDOM.unmountComponentAtNode(div)
  })
})
