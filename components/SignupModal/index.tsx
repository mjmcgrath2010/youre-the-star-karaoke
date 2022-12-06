import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export interface SignupModalProps {
  title?: string;
  artist?: string;
  diskNumber?: string;
  onClose: (val?: undefined) => void;
}

const SignupModal = ({
  title,
  artist,
  diskNumber,
  onClose,
}: SignupModalProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose(undefined);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add song to queue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Signup for {title} by {artist}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add to queue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignupModal;
