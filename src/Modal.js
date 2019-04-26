import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
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

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    console.log(this.props.children.state);
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
            {this.props.children}
            <IconButton onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <IconButton onClick={this.handleSave}>
              <SaveIcon />
            </IconButton>
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
