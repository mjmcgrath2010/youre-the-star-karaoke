import React, { useState, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import useSocket from "../../hooks/useSocket";
import { useAppSelector } from "../../hooks/useRedux";
import { selectUserId } from "../../features/user/userSlice";

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
  const socket = useSocket();
  const userId = useAppSelector(selectUserId);

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(async () => {
    if (socket) {
      socket.emit("new-signup", {
        name: input,
        title,
        artist,
        diskNumber,
        id,
        createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        userId,
      });
    }

    onClose(undefined);
    setOpen(false);
  }, [input, title, artist, diskNumber, id, onClose, socket, userId]);

  const handleClose = () => {
    setOpen(false);
    onClose(undefined);
  };

  return (
    <div>
      <Dialog maxWidth="xl" open={open} onClose={handleClose}>
        <DialogTitle>Add new song to the queue</DialogTitle>
        <DialogContent
          sx={{
            minWidth: "40vw",
          }}
        >
          <DialogContentText>
            Add {title} by {artist}
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
