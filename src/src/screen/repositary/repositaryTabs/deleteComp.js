import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@material-ui/core";

const DeleteComponent = (props) => {
  const { classes } = props;
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.deleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props?.rolesDelete
              ? "Deleting this role will entirely delete the role from every possible entity. Are you sure you want to delete?"
              : "Are you sure you want to delete this item?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => props.deleteClose(true)}
            className={classes.btn}
            variant="contained"
          >
            Yes
          </Button>
          <Button
            onClick={() => props.deleteClose(false)}
            className={classes.btn}
            variant="contained"
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteComponent;
