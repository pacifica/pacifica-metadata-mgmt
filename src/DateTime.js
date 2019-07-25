import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
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

function DateTimeDisplay (props) {
  const { classes, key, defValue, type } = props

  return (
    <TextField
      id={`${key}-datetime`}
      key={key}
      label={key}
      type={type}
      defaultValue={defValue}
      className={classes.textField}
      disabled={true}
      fullWidth={true}
      select={false}
      InputLabelProps={{
        shrink: true
      }}
    />
  )
}

DateTimeDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  key: PropTypes.string,
  defValue: PropTypes.string,
  type: PropTypes.string
}

export default withStyles(styles)(DateTimeDisplay)
