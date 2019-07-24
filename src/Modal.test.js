import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import EditIcon from '@material-ui/icons/Edit'
import SimpleModal from './Modal'

describe('<SimpleModal />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<SimpleModal
      title="Create"
      icon={() => { return (<EditIcon />) }}
      MDUrl="http://localhost:8121"
      object="keys"
      defaults={{}}
      closeUpdate={() => {
        console.log('Closed Modal')
      }}
      MDUrl="http://localhost:8121" />)
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
