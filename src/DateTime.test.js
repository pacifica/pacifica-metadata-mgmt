import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import DateTimeDisplay from './DateTime'

it('renders without crashing', () => {
  const wrapper = mount(<DateTimeDisplay />)
  const div = document.createElement('div')
  ReactDOM.render(wrapper, div)
  ReactDOM.unmountComponentAtNode(div)
})
