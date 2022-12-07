import React, { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";

let socket: Socket | null;
export interface SignupModalProps {
  title?: string;
  artist?: string;
  diskNumber?: string;
  id?: string;
  onClose: (val?: undefined) => void;
}

const SignupModal = ({
  title,
  artist,
  diskNumber,
  id,
  onClose,
}: SignupModalProps) => {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    return Promise.resolve();
  };

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(async () => {
    await socketInitializer();

    if (socket) {
      socket.emit("new-signup", {
        name: input,
        title,
        artist,
        diskNumber,
        id,
        createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
      socket.on("disconnect", () => {
        socket?.removeAllListeners();
        socket?.close();
        socket = null;
      });
    }
    setOpen(false);
    onClose(undefined);
  }, [input, title, artist, diskNumber, id, onClose]);

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
