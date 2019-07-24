import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import ListItem from '@material-ui/core/ListItem'
import App from './App'

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<App MDUrl="http://localhost:8121" />)
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('finds a single button to open the drawer', () => {
    const wrapper = mount(<App MDUrl="http://localhost:8121" />)
    wrapper
      .find('button#header-open-drawer')
      .first()
      .simulate('click')
  })
  it('saves internal selected object', () => {
    const wrapper = mount(<App MDUrl="http://localhost:8121" />)
    wrapper
      .find(ListItem)
      .first()
      .simulate('click')
  })
})
