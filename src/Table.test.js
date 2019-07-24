import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import DynamicTable from './Table'

it('renders without crashing', () => {
  const wrapper = mount(<DynamicTable MDUrl="http://localhost:8121" object="users" />)
  const div = document.createElement('div')
  ReactDOM.render(wrapper, div)
  ReactDOM.unmountComponentAtNode(div)
})
