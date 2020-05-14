import PropTypes from 'prop-types'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = function styles (theme) {
  return ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    }
  })
}

class DateTimeDisplay extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      textField: PropTypes.string.isRequired
    }).isRequired,
    defValue: PropTypes.string,
    key: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    defValue: '',
    key: '',
    type: ''
  }

  static shouldComponentUpdate () {
    return false
  }

  render () {
    const { classes, key, defValue, type } = this.props
    return (
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        // eslint-disable-next-line react/forbid-component-props
        className={classes.textField}
        defaultValue={defValue}
        disabled
        fullWidth
        id={`${key}-datetime`}
        key={key}
        label={key}
        select={false}
        type={type}
      />
    )
  }
}

export default withStyles(styles)(DateTimeDisplay)
