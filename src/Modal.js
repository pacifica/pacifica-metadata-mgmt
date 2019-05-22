import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false,
    form_inputs: <Typography>Nothing to see here</Typography>,
    form_data: {},
    primary_keys: []
  };

  update_form_input = (input, value) => {
    this.setState(prevState => ({
      ...prevState,
      form_data: {
        ...prevState.form_data,
        [input]: value
      }
    }));
  };
  form_layout_columns = (field_list, field_types, primary_keys) => {
    let defaults = this.state.form_data;
    return (
      <FormControl component="fieldset">
        <Grid container spacing={24}>
          {field_list.map((key, index) => {
            let field_def;
            switch (field_types[key]) {
              case "DATETIME":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      type="datetime-local"
                      defaultValue={defaults[key]}
                      onChange={event => {
                        this.update_form_input(key, event.target.value);
                      }}
                    />
                  </Grid>
                );
                break;
              case "DATE":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      type="date-local"
                      defaultValue={defaults[key]}
                      onChange={event => {
                        this.update_form_input(key, event.target.value);
                      }}
                    />
                  </Grid>
                );
                break;
              case "VARCHAR":
              case "TEXT":
                let actual_key = key;
                if (primary_keys.includes(key)) {
                  actual_key = `_${key}`;
                }
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      defaultValue={defaults[actual_key]}
                      multiline={field_types[key] === "TEXT"}
                      onChange={event => {
                        this.update_form_input(actual_key, event.target.value);
                      }}
                    />
                  </Grid>
                );
                break;
              case "UUID":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      defaultValue={defaults[key]}
                      onChange={event => {
                        this.update_form_input(key, event.target.value);
                      }}
                    />
                  </Grid>
                );
                break;
              case "INT":
              case "BIGINT":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      label={key}
                      defaultValue={defaults[key]}
                      InputLabelProps={{ shrink: true }}
                      onChange={event => {
                        this.update_form_input(key, event.target.value);
                      }}
                    />
                  </Grid>
                );
                break;
              case "BOOL":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <Typography>{key}</Typography>
                    <Checkbox
                      label={key}
                      value={key}
                      defaultChecked={this.state.form_data[key]}
                      onChange={event => {
                        this.update_form_input(key, event.target.checked);
                      }}
                    />
                  </Grid>
                );
                break;
              case "AUTO":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={key}
                      defaultValue={defaults[`_${key}`]}
                      InputLabelProps={{ shrink: true }}
                      onChange={event => {
                        this.update_form_input(`_${key}`, event.target.value);
                      }}
                    />
                  </Grid>
                );
                break;
              default:
                console.log(field_types[key]);
                field_def = (
                  <Grid item xs={12}>
                    <Typography>Something Unknown!</Typography>
                  </Grid>
                );
                break;
            }
            return field_def;
          })}
        </Grid>
      </FormControl>
    );
  };

  get_form_layout = () => {
    return new Promise((resolve, reject) => {
      Axios.get(`${this.props.md_url}/objectinfo/${this.props.object}`)
        .then(res => {
          this.setState({
            form_data: this.props.defaults
          });
          this.setState({
            form_inputs: this.form_layout_columns(
              res.data.field_list,
              res.data.field_types,
              res.data.primary_keys
            ),
            primary_keys: res.data.primary_keys
          });
          resolve(res);
        })
        .catch(reject);
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.closeUpdate();
  };

  handleSave = () => {
    let method = Axios.put;
    let params = {};
    if (this.props.title === "Edit") {
      method = Axios.post;
      this.state.primary_keys.map(key => {
        let actual_key = key;
        if (key === "id") {
          actual_key = `_${key}`;
        }
        params[actual_key] = this.state.form_data[actual_key];
        return this.state.form_data[actual_key];
      });
    }
    method(`${this.props.md_url}/${this.props.object}`, this.state.form_data, {
      params: params
    })
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.log(JSON.stringify(res, null, 2));
        alert(res.response.data.traceback);
      });
  };

  handleOpen = () => {
    this.get_form_layout().then(res => {
      this.setState({ open: true });
    });
  };
  render() {
    const { classes, title, icon } = this.props;
    const modalStyle = {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    };
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
            <Typography variant="h6" id="modal-title">
              {title}
            </Typography>
            <form>
              <FormControl component="fieldset">
                {this.state.form_inputs}
                <IconButton onClick={this.handleClose}>
                  <CloseIcon />
                </IconButton>
                <IconButton onClick={this.handleSave}>
                  <SaveIcon />
                </IconButton>
              </FormControl>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleModal);
