import React, {useState} from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Hero() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <h2>
        A Real-Time Collaborative Whiteboard{" "}
        <Typography variant="body2" component="span" gutterBottom>
          By Pramod Boda
        </Typography>
      </h2>
      {/* <h3>How to Test?</h3> */}
      <Button variant="contained" onClick={handleClickOpen}>
      How to Test?
      </Button>
    
      {/* <Typography variant="h4" gutterBottom>
        A Real-Time Collaborative Whiteboard
      </Typography> */}

<Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle>{"How to Test?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Typography variant="body1">
        <ol>
          <li>Open the whiteboard application.</li>
          <li>Draw something on the canvas using the pen tool.</li>
          <li>
            Open the same URL:{" "}
            <Link
              href="https://collaborative-whiteboard-nu.vercel.app/"
              target="_blank"
            >
              Collaborative Whiteboard
            </Link>
            <ul>
              <li>in a new browser tab</li>
              <li>in another browser</li>
              <li>or on different devices connected to the internet</li>
            </ul>
          </li>
          <li>Start drawing from any device or tab.</li>
          <li>
            Watch all changes appear instantly across every connected screen in
            real time.
          </li>
        </ol>
      </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
