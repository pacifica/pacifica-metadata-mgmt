import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import App from './App'

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<App MDUrl="http://localhost:8121" />)
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
