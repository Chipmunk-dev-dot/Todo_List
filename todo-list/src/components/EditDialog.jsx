import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function EditDialog({id, updateData}) {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const updateTask = () => {
    updateData.mutate({id,task});
   }

  return (
    <React.Fragment>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontWeight: "bold" }} textAlign="start">
          Edit Task
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Edit Task"
            fullWidth
            variant="outlined"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" autoFocus onClick={updateTask}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

