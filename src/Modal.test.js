import React from 'react'
import ReactDOM from 'react-dom'
import EditIcon from '@material-ui/icons/Edit'
import SimpleModal from './Modal'
import { act } from '@testing-library/react'

describe('<SimpleModal />', function() {
  it('renders without crashing', function() {
    const div = document.createElement('div')
    act(() => {
      ReactDOM.render(<SimpleModal
        title="Some Modal Title"
        icon={() => { return (<EditIcon />) }}
        MDUrl="http://localhost:8121"
        object="keys"
        defaults={{}}
        closeUpdate={() => {
          return
        }} />, div)
    })
    ReactDOM.unmountComponentAtNode(div)
  })
})
