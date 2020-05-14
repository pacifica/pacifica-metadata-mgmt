/* eslint-disable max-lines */
import Axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox'
import CloseIcon from '@material-ui/icons/Close'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import PropTypes from 'prop-types'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const defaultFormText = 'Nothing to see here.'
const unknownColumnTypeTitle = 'Some unknown column type was given.'

const styles = function styles (theme) {
  return ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      // eslint-disable-next-line no-magic-numbers
      boxShadow: theme.shadows[5],
      outline: 'none',
      // eslint-disable-next-line no-magic-numbers
      padding: theme.spacing.unit * 4,
      position: 'absolute',
      // eslint-disable-next-line no-magic-numbers
      width: theme.spacing.unit * 100
    }
  })
}

class SimpleModal extends React.Component {
  static propTypes = {
    MDUrl: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      paper: PropTypes.string.isRequired
    }).isRequired,
    closeUpdate: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    defaults: PropTypes.object,
    icon: PropTypes.func.isRequired,
    object: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
    // eslint-disable-next-line no-empty-function
    closeUpdate: () => {},
    defaults: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      formData: {},
      formInputs: (
        <Typography>
          {defaultFormText}
        </Typography>),
      open: false,
      primaryKeys: []
    }
    this.updateFormInput = this.updateFormInput.bind(this)
    this.formLayoutColumns = this.formLayoutColumns.bind(this)
    this.getFormLayout = this.getFormLayout.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  static shouldComponentUpdate () {
    return false
  }

  updateFormInput (input, value) {
    this.setState((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [input]: value
      }
    }))
  }

  fieldDefDatetime (key, type) {
    const { formData } = this.state
    return (
      <Grid
        item
        key={key}
        sm={6}
        xs={12}
      >
        <TextField
          InputLabelProps={{ shrink: true }}
          defaultValue={formData[key]}
          id={`modal-input-${key.replace(
/_/gu,
'-'
)}`}
          key={key}
          label={key}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={(event) => {
            this.updateFormInput(
              key,
              event.target.value
            )
          }}
          type={`${type}-local`}
        />
      </Grid>
    )
  }

  fieldDefText (actualKey, key, extraprops) {
    const { formData } = this.state
    return (
      <Grid
        item
        key={key.replace(
          /_/gu,
          '-'
        )}
        sm={6}
        xs={12}
      >
        <TextField
          InputLabelProps={{ shrink: true }}
          defaultValue={formData[actualKey]}
          id={`modal-input-${key.replace(
/_/gu,
'-'
)}`}
          label={key}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={(event) => {
            this.updateFormInput(
              actualKey,
              event.target.value
            )
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...extraprops}
        />
      </Grid>
    )
  }

  fieldDefCheckbox (key) {
    const { formData } = this.state
    return (
      <Grid
        item
        key={key}
        sm={6}
        xs={12}
      >
        <Typography>
          {key}
        </Typography>
        <Checkbox
          defaultChecked={formData[key]}
          id={
            `modal-input-${key.replace(
            /_/gu,
            '-'
            )}`
          }
          label={key}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={(event) => {
            this.updateFormInput(
              key,
              event.target.checked
            )
          }}
          value={key}
        />
      </Grid>
    )
  }

  fieldDefError (key) {
    const { formData } = this.state
    // eslint-disable-next-line no-console
    console.log(key)
    return (
      <Grid
        item
        key={key}
        xs={12}
      >
        <Typography>
          <p>
            {unknownColumnTypeTitle}
          </p>
          <pre>
            {formData}
          </pre>
        </Typography>
      </Grid>
    )
  }

  // Huge case statement can't do much about
  // eslint-disable-next-line max-lines-per-function
  formLayoutColumns (fieldList, fieldTypes, primaryKeys) {
    return (
      <FormControl component="fieldset">
        <Grid
          container
          spacing={24}
        >
          {fieldList.map((key, index) => {
            let actualKey = key
            switch (fieldTypes[key]) {
              case 'DATETIME':
                return this.fieldDefDatetime(
                  key,
                  'datetime'
                )
              case 'DATE':
                return this.fieldDefDatetime(
                  key,
                  'date'
                )
              case 'VARCHAR':
              case 'TEXT':
                if (primaryKeys.includes(key)) {
                  actualKey = `_${key}`
                }
                return this.fieldDefText(
                  actualKey,
                  key,
                  { multiline: fieldTypes[key] === 'TEXT' }
                )
              case 'UUID':
                return this.fieldDefText(
                  key,
                  key,
                  { multiline: false }
                )
              case 'INT':
              case 'BIGINT':
                return this.fieldDefText(
                  key,
                  key,
                  { type: 'number' }
                )
              case 'BOOL':
                return this.fieldDefCheckbox(key)
              case 'AUTO':
                return this.fieldDefText(
                  `_${key}`,
                  key,
                  {}
                )
              default:
                return this.fieldDefError(fieldTypes[key])
            }
          })}
        </Grid>
      </FormControl>
    )
  }

  getFormLayout () {
    const { MDUrl, object, defaults } = this.props
    return new Promise((resolve, reject) => {
      Axios.get(`${MDUrl}/objectinfo/${object}`).then((res) => {
        this.setState({
          formData: defaults
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
      })
        .catch(reject)
    })
  }

  handleClose () {
    const { closeUpdate } = this.props
    this.setState({ open: false })
    closeUpdate()
  }

  handleSave () {
    const { title, MDUrl, object } = this.props
    const { primaryKeys, formData } = this.state
    let method = Axios.put
    const params = {}
    if (title.includes('Edit')) {
      method = Axios.post
      primaryKeys.map((key) => {
        let actualKey = key
        if (key === 'id') {
          actualKey = `_${key}`
        }
        params[actualKey] = formData[actualKey]
        return formData[actualKey]
      })
    }
    method(
`${MDUrl}/${object}`,
formData,
{
  params
}
    ).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
      this.handleClose()
    })
      .catch((res) => {
        const consoleMsg = JSON.stringify(
          res,
          null,
          // eslint-disable-next-line no-magic-numbers
          2
        )
        const { traceback } = res.response.data
        // eslint-disable-next-line no-console
        console.log(consoleMsg)
        // eslint-disable-next-line no-alert
        alert(traceback)
      })
  }

  handleOpen () {
    this.getFormLayout().then((res) => {
      this.setState({ open: true })
    })
  }

  openButton () {
    const { title, icon } = this.props
    return (
      <IconButton
        aria-label={`Open ${title}`}
        color="inherit"
        id={`modal-button-${title.replace(
/ /gu,
'-'
).toLowerCase()}`}
        onClick={this.handleOpen}
      >
        <icon />
      </IconButton>

    )
  }

  titleText () {
    const { title } = this.props
    return (
      <Typography
        color="inherit"
        id="modal-title"
        noWrap
        variant="h6"
      >
        {title}
      </Typography>
    )
  }

  render () {
    const { classes } = this.props
    const { paper } = classes
    const { open, formInputs } = this.state
    return (
      <div>
        {this.openButton()}
        <Modal
          aria-describedby="simple-modal-description"
          aria-labelledby="simple-modal-title"
          onClose={this.handleClose}
          open={open}
        >
          <div
            className={paper}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {this.titleText()}
            <form>
              <FormControl component="fieldset">
                {formInputs}
                <IconButton
                  id="modal-button-close"
                  key="close-button"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  id="modal-button-save"
                  key="save-button"
                  onClick={this.handleSave}
                >
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

export default withStyles(styles)(SimpleModal)
