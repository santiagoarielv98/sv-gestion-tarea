import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { type FormikHelpers, type FormikState, useFormik } from "formik"
import _ from "lodash"
import moment from "moment"
import React from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import type { Label } from "../redux/labels/labelThunk"
import {
  selectModalState,
  setModalConfirm,
  setModalOpen,
} from "../redux/modal/modalSlice"
import { addTask } from "../redux/tasks/taskThunk"
import { taskValidationSchema } from "../schemas/taskValidationSchema"
import LabelAutoComplete from "./LabelAutoComplete"

const priorityOptions = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Urgent" },
  { value: 5, label: "Immediate" },
]

type InitialValues = {
  title: string
  description: string
  completed: boolean
  labels: Label[]
  dueDate: string
  priority: number
}

export const FormikContext = React.createContext<
  FormikHelpers<InitialValues> & FormikState<InitialValues>
>({} as any)

function TaskForm() {
  const dispatch = useAppDispatch()
  const { modalOpen, modalConfirm } = useAppSelector(selectModalState)
  const initialValues = {
    title: "",
    description: "",
    completed: false,
    labels: [],
    dueDate: new Date().toString(),
    priority: 2,
  }

  const handleClose = () => {
    if (_.isEqual(initialValues, formik.values)) {
      dispatch(setModalOpen(null))
      formik.resetForm()
    } else {
      dispatch(setModalConfirm(true))
    }
  }

  const handleCloseConfirm = () => {
    dispatch(setModalConfirm(false))
  }

  const handleConfirm = () => {
    dispatch(setModalConfirm(false))
    dispatch(setModalOpen(null))
    formik.resetForm()
  }

  const formik = useFormik<InitialValues>({
    initialValues: initialValues,
    validationSchema: taskValidationSchema,
    onSubmit: (values, formikHelpers) => {
      dispatch(
        addTask({
          title: values.title,
          description: values.description,
          completed: values.completed,
          labels: values.labels.map(label => label.id),
          dueDate: values.dueDate.toString(),
          priority: values.priority,
        }),
      )
      dispatch(setModalOpen(null))
      formikHelpers.resetForm()
    },
    enableReinitialize: true,
  })

  return (
    <>
      <Dialog open={modalOpen === "task"} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new task to your to-do list.
          </DialogContentText>
          <FormikContext.Provider value={formik}>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3, maxWidth: 400, mx: "auto" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={6}
                    size="small"
                    id="description"
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Select
                      id="priority"
                      name="priority"
                      value={String(formik.values.priority)}
                      onChange={e =>
                        formik.setFieldValue("priority", e.target.value)
                      }
                    >
                      {priorityOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    minDate={moment().startOf("day")}
                    value={moment(formik.values.dueDate)}
                    onChange={date => {
                      console.log("mataron")
                      formik.setFieldValue("dueDate", date?.format())
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        onBlur: formik.handleBlur,
                        error:
                          formik.touched.dueDate &&
                          Boolean(formik.errors.dueDate),
                        helperText:
                          formik.touched.dueDate &&
                          (formik.errors.dueDate as string),
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LabelAutoComplete />
                </Grid>
              </Grid>
              <input type="submit" style={{ display: "none" }} hidden />
            </Box>
          </FormikContext.Provider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={formik.submitForm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalConfirm}
        onClose={() => dispatch(setModalConfirm(false))}
      >
        <DialogTitle>Discard Changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to discard the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TaskForm
