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
import CreateIcon from "@material-ui/icons/Create";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import Icon from "@material-ui/core/Icon";

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
    open: false
  };
  form_layout_columns = (field_list, field_types, primary_keys, defaults) => {
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
                    />
                  </Grid>
                );
                break;
              case "BOOL":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <Typography>{key}</Typography>
                    <Checkbox label={key} checked={defaults[key]} />
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

  getFormLayout = (md_url, object, defaults) => {
    return new Promise((resolve, reject) => {
      Axios.get(`${md_url}/objectinfo/${object}`)
        .then(res => {
          resolve(
            this.form_layout_columns(
              res.data.field_list,
              res.data.field_types,
              res.data.primary_keys,
              defaults
            )
          );
        })
        .catch(reject);
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = values => {
    console.log(values);
  };

  handleOpen = () => {
    this.setState({ open: true });
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
            <form onSubmit={this.handleSave}>
              <FormControl component="fieldset">
                {this.props.children}
                <IconButton onClick={this.handleClose}>
                  <CloseIcon />
                </IconButton>
                <IconButton>
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
