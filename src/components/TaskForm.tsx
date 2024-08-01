import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { useFormik } from "formik"
import * as Yup from "yup"
import LabelAutoComplete from "./LabelAutoComplete"
/* 
export interface ITask {
  id: string
  title: string
  description?: string
  completed: boolean -> default false
  labels: string[] -> default []
  dueDate: Date -> default now
  priority: number -> default 1
}
*/

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

function TaskForm() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      completed: false,
      labels: [],
      dueDate: new Date(),
      priority: 2,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
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
            helperText={formik.touched.description && formik.errors.description}
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Task
      </Button>
    </Box>
  )
}

export default TaskForm
