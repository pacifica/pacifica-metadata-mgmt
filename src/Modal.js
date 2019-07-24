import React from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
})

class SimpleModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      formInputs: <Typography>Nothing to see here</Typography>,
      formData: {},
      primaryKeys: []
    }
    this.updateFormInput = this.updateFormInput.bind(this)
    this.formLayoutColumns = this.formLayoutColumns.bind(this)
    this.getFormLayout = this.getFormLayout.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  updateFormInput (input, value) {
    this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [input]: value
      }
    }))
  }
  formLayoutColumns (fieldList, fieldTypes, primaryKeys) {
    let defaults = this.state.formData
    return (
      <FormControl component="fieldset">
        <Grid container spacing={24}>
          {fieldList.map((key, index) => {
            let fieldDef
            let actualKey
            switch (fieldTypes[key]) {
              case 'DATETIME':
                fieldDef = (
                  <Grid item xs={12} sm={6} key={key}>
                    <div key={key}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        label={key}
                        type="datetime-local"
                        defaultValue={defaults[key]}
                        onChange={event => {
                          this.updateFormInput(key, event.target.value)
                        }}
                      />
                    </div>
                  </Grid>
                )
                break
              case 'DATE':
                fieldDef = (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      type="date-local"
                      defaultValue={defaults[key]}
                      onChange={event => {
                        this.updateFormInput(key, event.target.value)
                      }}
                    />
                  </Grid>
                )
                break
              case 'VARCHAR':
              case 'TEXT':
                actualKey = key
                if (primaryKeys.includes(key)) {
                  actualKey = `_${key}`
                }
                fieldDef = (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      defaultValue={defaults[actualKey]}
                      multiline={fieldTypes[key] === 'TEXT'}
                      onChange={event => {
                        this.updateFormInput(actualKey, event.target.value)
                      }}
                    />
                  </Grid>
                )
                break
              case 'UUID':
                fieldDef = (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      defaultValue={defaults[key]}
                      onChange={event => {
                        this.updateFormInput(key, event.target.value)
                      }}
                    />
                  </Grid>
                )
                break
              case 'INT':
              case 'BIGINT':
                fieldDef = (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      type="number"
                      label={key}
                      defaultValue={defaults[key]}
                      InputLabelProps={{ shrink: true }}
                      onChange={event => {
                        this.updateFormInput(key, event.target.value)
                      }}
                    />
                  </Grid>
                )
                break
              case 'BOOL':
                fieldDef = (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography>{key}</Typography>
                    <Checkbox
                      label={key}
                      value={key}
                      defaultChecked={this.state.formData[key]}
                      onChange={event => {
                        this.updateFormInput(key, event.target.checked)
                      }}
                    />
                  </Grid>
                )
                break
              case 'AUTO':
                fieldDef = (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      label={key}
                      defaultValue={defaults[`_${key}`]}
                      InputLabelProps={{ shrink: true }}
                      onChange={event => {
                        this.updateFormInput(`_${key}`, event.target.value)
                      }}
                    />
                  </Grid>
                )
                break
              default:
                // eslint-disable-next-line no-console
                console.log(fieldTypes[key])
                fieldDef = (
                  <Grid item xs={12} key={key}>
                    <Typography>Something Unknown!</Typography>
                  </Grid>
                )
                break
            }
            return fieldDef
          })}
        </Grid>
      </FormControl>
    )
  }

  getFormLayout () {
    return new Promise((resolve, reject) => {
      Axios.get(`${this.props.MDUrl}/objectinfo/${this.props.object}`).then(res => {
        this.setState({
          formData: this.props.defaults
        })
        this.setState({
          formInputs: this.formLayoutColumns(
            res.data.field_list,
            res.data.field_types,
            res.data.primary_keys
          ),
          primaryKeys: res.data.primary_keys
        })
        resolve(res)
      }).catch(reject)
    })
  }

  handleClose () {
    this.setState({ open: false })
    this.props.closeUpdate()
  }

  handleSave () {
    let method = Axios.put
    let params = {}
    if (this.props.title === 'Edit') {
      method = Axios.post
      this.state.primaryKeys.map(key => {
        let actualKey = key
        if (key === 'id') {
          actualKey = `_${key}`
        }
        params[actualKey] = this.state.formData[actualKey]
        return this.state.formData[actualKey]
      })
    }
    method(`${this.props.MDUrl}/${this.props.object}`, this.state.formData, {
      params: params
    }).then(res => {
      // eslint-disable-next-line no-console
      console.log(res)
    }).catch(res => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(res, null, 2))
      alert(res.response.data.traceback)
    })
  }

  handleOpen () {
    this.getFormLayout().then(res => {
      this.setState({ open: true })
    })
  }
  render () {
    const { classes, title, icon } = this.props
    const modalStyle = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Open create"
          onClick={this.handleOpen}
        >
          {icon()}
        </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="h6" color="inherit" noWrap id="modal-title">
              {title}
            </Typography>
            <form>
              <FormControl component="fieldset">
                {this.state.formInputs}
                <IconButton onClick={this.handleClose} key="close-button">
                  <CloseIcon />
                </IconButton>
                <IconButton onClick={this.handleSave} key="save-button">
                  <SaveIcon />
                </IconButton>
              </FormControl>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  MDUrl: PropTypes.string.isRequired,
  object: PropTypes.string.isRequired,
  defaults: PropTypes.object,
  title: PropTypes.string.isRequired,
  icon: PropTypes.method.isRequired,
  closeUpdate: PropTypes.method
}

export default withStyles(styles)(SimpleModal)
