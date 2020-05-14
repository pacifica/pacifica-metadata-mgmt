import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PropTypes from 'prop-types'
import React from 'react'

class ChevronByDirection extends React.Component {
  static propTypes = {
    direction: PropTypes.oneOf([
      'ltr',
      'gtr'
    ]).isRequired
  }

  static shouldComponentUpdate () {
    return false
  }

  render () {
    const { direction } = this.props
    if (direction === 'ltr') {
      return (<ChevronLeftIcon />)
    }
    return (<ChevronRightIcon />)
  }
}

export default ChevronByDirection
