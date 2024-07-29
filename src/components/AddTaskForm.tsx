import { CloseOutlined } from "@ant-design/icons"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import React from "react"

import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { DateTimePicker } from "@mui/x-date-pickers"
import { useFormik } from "formik"
import _ from "lodash"
import moment, { type Moment } from "moment"
import * as Yup from "yup"
import { createTask } from "../services/tasks"

export interface TaskFormValues {
  title: string
  description?: string
  dueDate: Moment
  labels?: string[]
  priority: "low" | "medium" | "high"
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
  dueDate: Yup.date().min(moment().startOf("day"), "Due date must be today"),
  labels: Yup.array().optional(),
  priority: Yup.string().oneOf(["low", "medium", "high"], "Invalid priority"),
})

function AddTaskForm() {
  const [open, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const formik = useFormik<TaskFormValues>({
    initialValues: {
      title: "",
      description: "",
      dueDate: moment().startOf("day"),
      labels: [],
      priority: "medium",
    },
    validationSchema,
    onSubmit: async values => {
      createTask(values)
      setOpen(false)
      formik.resetForm()
    },
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = async () => {
    const { dueDate, ...values } = formik.values
    const { dueDate: initialDueDate, ...initialValues } = formik.initialValues

    if (_.isEqual(values, initialValues) && dueDate.isSame(initialDueDate)) {
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
                  required
                  autoFocus
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
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
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  name="dueDate"
                  label="Due Date"
                  minDate={moment().startOf("day")}
                  value={formik.values.dueDate}
                  onChange={d => {
                    formik.setFieldValue("dueDate", d)
                  }}
                  slotProps={{
                    textField: {
                      id: "dueDate",
                      fullWidth: true,
                      helperText: formik.errors.dueDate as unknown as string,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(formik.errors.priority)}>
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    id="priority"
                    name="priority"
                    value={formik.values.priority}
                    label="Priority"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                  <FormHelperText>{formik.errors.priority}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <input
              type="submit"
              hidden
              disabled={!formik.isValid || !formik.dirty}
            />
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
