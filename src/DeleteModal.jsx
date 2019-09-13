import Axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = function styles (theme) {
  return ({
    'paper': {
      'backgroundColor': theme.palette.background.paper,
      // eslint-disable-next-line no-magic-numbers
      'boxShadow': theme.shadows[5],
      'outline': 'none',
      // eslint-disable-next-line no-magic-numbers
      'padding': theme.spacing.unit * 4,
      'position': 'absolute',
      // eslint-disable-next-line no-magic-numbers
      'width': theme.spacing.unit * 100
    }
  })
}

class DeleteModal extends React.Component {
  static propTypes = {
    'MDUrl': PropTypes.string.isRequired,
    'classes': PropTypes.shape({
      'paper': PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    'deleteArgs': PropTypes.object.isRequired,
    'object': PropTypes.string.isRequired,
    'rowIndex': PropTypes.number.isRequired,
    'updateFunc': PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      'open': false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleDelete () {
    const { MDUrl, object, deleteArgs } = this.props
    Axios.delete(`${MDUrl}/${object}`, {
      'params': deleteArgs
    }).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
      this.handleClose()
    })
      .catch((res) => {
        // eslint-disable-next-line no-magic-numbers
        const consoleMsg = JSON.stringify(res, null, 2)
        const { traceback } = res.response.data
        // eslint-disable-next-line no-console
        console.log(consoleMsg)
        // eslint-disable-next-line no-alert
        alert(traceback)
      })
  }

  handleClose () {
    const { updateFunc } = this.props
    this.setState({ 'open': false })
    updateFunc()
  }

  handleOpen () {
    this.setState({ 'open': true })
  }

  // eslint-disable-next-line max-lines-per-function
  render () {
    const { classes, rowIndex, deleteArgs } = this.props
    const { paper } = classes
    const { open } = this.state
    return (
      <div>
        <IconButton
          aria-label={`Delete Row ${rowIndex}`}
          color="inherit"
          id={`modal-button-delete-row-${rowIndex}`}
          onClick={this.handleOpen}
        >
          <DeleteIcon />
        </IconButton>

        <Modal
          aria-describedby="simple-modal-description"
          aria-labelledby="simple-modal-title"
          onClose={this.handleClose}
          open={open}
        >
          <div
            className={paper}
            id="delete-modal"
            style={{
              'left': '50%',
              'top': '50%',
              'transform': 'translate(-50%, -50%)'
            }}
          >
            <Typography
              color="inherit"
              id="modal-title"
              noWrap
              variant="h6"
            >
              {'Confirm to Delete'}
            </Typography>
            <Typography
              color="inherit"
              id="modal-title"
              noWrap
            >
              {`Are you sure you want to delete? ${JSON.stringify(deleteArgs)}`}
            </Typography>
            <IconButton
              id="modal-button-close"
              key="close-button"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              id="modal-button-delete"
              key="delete-button"
              onClick={this.handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Modal>
      </div>
    )
  }
}
export default withStyles(styles)(DeleteModal)
