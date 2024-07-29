import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import React from "react"
import { CloseOutlined } from "@ant-design/icons"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import DialogActions from "@mui/material/DialogActions"

import { useFormik } from "formik"
import * as Yup from "yup"
import moment from "moment"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import _ from "lodash"

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
  dueDate: Yup.date().min(
    moment().format("YYYY-MM-DD"),
    "Due date must be today",
  ),
  labels: Yup.array().optional(),
  priority: Yup.string().optional().oneOf(["low", "medium", "high"]),
})

function AddTaskForm() {
  const [open, setOpen] = React.useState(true)
  const [openDialog, setOpenDialog] = React.useState(false)
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: moment().format("YYYY-MM-DD"),
      labels: [],
      priority: "medium",
    },
    validationSchema,
    onSubmit: values => {
      setOpen(false)
      formik.resetForm()
    },
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = async () => {
    if (_.isEqual(formik.values, formik.initialValues)) {
      setOpen(false)
    } else {
      setOpenDialog(true)
    }
  }

  const closeDialog = () => {
    formik.resetForm()
    setOpenDialog(false)
    setOpen(false)
  }

  const handleSave = () => {
    formik.submitForm()
  }

  return (
    <>
      <Button onClick={handleClickOpen}>Open form dialog</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseOutlined />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="dueDate"
                  name="dueDate"
                  label="Due Date"
                  type="date"
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dueDate && Boolean(formik.errors.dueDate)
                  }
                  helperText={formik.touched.dueDate && formik.errors.dueDate}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="priority"
                  name="priority"
                  label="Priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.priority && Boolean(formik.errors.priority)
                  }
                  helperText={formik.touched.priority && formik.errors.priority}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSave}
            disabled={!formik.isValid || !formik.dirty}
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false)
        }}
      >
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <Typography>Dialog Content</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false)
            }}
          >
            Cancel
          </Button>
          <Button onClick={closeDialog}>Discard</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddTaskForm
