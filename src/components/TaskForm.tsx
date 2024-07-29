import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"

import { DateTimePicker } from "@mui/x-date-pickers"

import type { FormikProps } from "formik"
import type { TaskFormValues } from "./AddTaskForm"

import moment from "moment"

const TaskForm = ({ formik }: { formik?: FormikProps<TaskFormValues> }) => {
  if (!formik) {
    return null
  }
  return (
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
      <input type="submit" hidden disabled={!formik.isValid || !formik.dirty} />
    </form>
  )
}

export default TaskForm
