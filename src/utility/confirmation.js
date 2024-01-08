import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, description }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="confirmation-dialog-title" aria-describedby="confirmation-dialog-description">
      <DialogTitle id="confirmation-dialog-title" sx={{ fontWeight: 'bold', color: 'red', textTransform: 'uppercase' }}>{title || "Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description" sx={{ color: 'black', textTransform: 'uppercase' }}>{description || "Are you sure?"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
