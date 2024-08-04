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
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectLabelState } from "../redux/labels/labelSlice"
import type { Label } from "../redux/labels/labelThunk"
import {
  selectModalState,
  setModalConfirm,
  setModalOpen,
} from "../redux/modal/modalSlice"
import { selectTaskState, setCurrentTask } from "../redux/tasks/taskSlice"
import { addTask, updateTask } from "../redux/tasks/taskThunk"
import LabelAutoComplete from "./LabelAutoComplete"

const priorityOptions = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Urgent" },
  { value: 5, label: "Immediate" },
]

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Max 100 characters"),
  description: Yup.string().max(500, "Max 1000 characters"),
  completed: Yup.boolean(),
  labels: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      name: Yup.string(),
      color: Yup.string(),
    }),
  ),
  dueDate: Yup.date(),
  priority: Yup.number().min(1).max(5),
})

type InitialValues = {
  title: string
  description: string
  completed: boolean
  labels: Label[]
  dueDate: string
  priority: number
}

const initialValues: InitialValues = {
  title: "",
  description: "",
  completed: false,
  labels: [],
  dueDate: "",
  priority: 2,
}

export const FormikContext = React.createContext<
  FormikHelpers<InitialValues> & FormikState<InitialValues>
>({} as any)

function TaskForm() {
  const dispatch = useAppDispatch()
  const { loading, currentTask } = useAppSelector(selectTaskState)
  const { labels } = useAppSelector(selectLabelState)
  const { modalOpen, modalConfirm } = useAppSelector(selectModalState)

  const defaultValues: InitialValues = React.useMemo(
    () =>
      currentTask?.id
        ? {
            ...currentTask,
            labels: labels.filter(label =>
              currentTask.labels.includes(label.id),
            ),
          }
        : { ...initialValues, dueDate: new Date().toISOString() },
    [currentTask, labels],
  )
  const handleSubmit = (values: InitialValues) => {
    if (currentTask?.id) {
      dispatch(
        updateTask({
          id: currentTask.id,
          title: values.title,
          description: values.description,
          completed: values.completed,
          labels: values.labels.map(label => label.id),
          dueDate: values.dueDate.toString(),
          priority: values.priority,
        }),
      )
    } else {
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
    }
    dispatch(setModalOpen(null))
    formik.resetForm()
  }
  const handleClose = () => {
    if (_.isEqual(defaultValues, formik.values)) {
      dispatch(setModalOpen(null))
      dispatch(setCurrentTask(null))
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
    initialValues: defaultValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  })

  const isEdit = Boolean(currentTask?.id)

  return (
    <>
      <Dialog open={modalOpen === "task"} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit
              ? "Edit the task details."
              : "Add a new task to your to-do list."}
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
          <Button
            onClick={formik.submitForm}
            disabled={loading}
            color="primary"
          >
            {isEdit ? "Update" : "Add"}
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
