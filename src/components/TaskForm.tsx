import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { useFormik } from "formik"
import React from "react"
import * as Yup from "yup"
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
            autoFocus
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
          <Labels />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Task
      </Button>
    </Box>
  )
}

export default TaskForm

interface Label {
  id: string
  name: string
  color: string
  inputValue?: string
}

const labels: Label[] = [
  { id: "1", name: "Personal", color: "#FF0000" },
  { id: "2", name: "Work", color: "#00FF00" },
  { id: "3", name: "Shopping", color: "#0000FF" },
]

const filter = createFilterOptions<Label>()

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16)
}

function generateId() {
  return Math.random().toString(36).substring(7)
}

function Labels() {
  const [value, setValue] = React.useState<Label[]>([])

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: (Label | string)[],
  ) => {
    const strArr: string[] = []
    const labelArr: Label[] = []
    newValue.forEach(value => {
      if (typeof value === "string") {
        strArr.push(value)
      } else {
        labelArr.push(value)
      }
    })
    const newValues = [
      ...labelArr,
      ...strArr.map(str => ({
        id: generateId(),
        name: str,
        color: generateRandomColor(),
      })),
    ]
    setValue(newValues)
  }

  return (
    <Autocomplete
      freeSolo
      value={value}
      onChange={handleChange}
      multiple
      id="labels"
      options={labels}
      getOptionLabel={option => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue
        }
        // Regular option
        return option.name
      }}
      renderInput={params => (
        <TextField {...params} label="Labels" placeholder="Labels" />
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        const isExisting = labels.some((label: Label) => {
          return label.name === params.inputValue
        })
        if (params.inputValue !== "" && !isExisting) {
          filtered.push({
            id: params.inputValue,
            name: `Add "${params.inputValue}"`,
            color: "#000000",
          })
        }
        return filtered
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        return (
          <li key={option.id} {...optionProps}>
            {option.name}
          </li>
        )
      }}
    />
  )
}
