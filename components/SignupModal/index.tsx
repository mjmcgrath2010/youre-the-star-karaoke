import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

let socket: any;
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
  const [input, setInput] = useState("");

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });
    };
    socketInitializer();
  }, []);

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    setOpen(false);
    socket.emit("new-signup", { name: input, title, artist, diskNumber });
    onClose(undefined);
  };

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
            value={input}
            onChange={onChangeHandler}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add to queue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignupModal;
