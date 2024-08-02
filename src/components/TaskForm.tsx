import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { type FormikHelpers, type FormikState, useFormik } from "formik"
import React from "react"
import * as Yup from "yup"
import LabelAutoComplete from "./LabelAutoComplete"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { addTask } from "../redux/tasks/taskThunk"
import { selectTaskState } from "../redux/tasks/taskSlice"
import type { Label } from "../redux/labels/labelThunk"

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
  const { loading } = useAppSelector(selectTaskState)
  const formik = useFormik<InitialValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(
        addTask({
          title: values.title,
          description: values.description,
          completed: values.completed,
          labels: values.labels.map(label => label.id),
          dueDate: values.dueDate.toString(),
        }),
      ).then(() => {
        formik.resetForm()
      })
    },
  })

  return (
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
              required
              // autoFocus
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
                formik.touched.description && Boolean(formik.errors.description)
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
                onChange={e => formik.setFieldValue("priority", e.target.value)}
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
            <TextField
              fullWidth
              id="dueDate"
              name="dueDate"
              label="Due Date"
              type="date"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
              helperText={
                formik.touched.dueDate && (formik.errors.dueDate as string)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <LabelAutoComplete />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Task
        </Button>
      </Box>
    </FormikContext.Provider>
  )
}

export default TaskForm
