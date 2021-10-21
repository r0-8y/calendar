import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog onClose={props.onClose} open={props.open}>
        <DialogTitle>
          {"Are you sure you want to delete this event?"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              props.onDelete();
              props.onClose();
            }}
            color="primary"
          >
            Yes
          </Button>
          <Button onClick={props.onClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
