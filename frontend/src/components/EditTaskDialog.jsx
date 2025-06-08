import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const EditTaskDialog = ({ open, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task?.title || '');

  useEffect(() => {
    setTitle(task?.title || '');
  }, [task]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ ...task, title });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Task Title</DialogTitle>
      <DialogContent>
        <Box mt={1}>
          <TextField
            label="Task Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            autoFocus
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;