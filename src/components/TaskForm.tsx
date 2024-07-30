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
import { createLabel, getLabels, type Label } from "../services/label"
import React from "react"
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete"
import Chip from "@mui/material/Chip"

const filter = createFilterOptions<Label>()

const TaskForm = ({ formik }: { formik?: FormikProps<TaskFormValues> }) => {
  const [labels, setLabels] = React.useState<Label[]>([])

  React.useEffect(() => {
    getLabels().then(setLabels)
  }, [])

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
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={formik.values.labels}
            onChange={(event, newValue) => {
              console.log(newValue)
              const ids = newValue.filter(label => typeof label === "string")
              if (ids.length) {
                console.log(ids)
                createLabel({
                  name: ids[0],
                  color: "primary",
                }).then(doc => {
                  console.log(doc)
                  formik.setFieldValue("labels", [
                    ...newValue.filter(label => typeof label !== "string"),
                    { id: doc.id, name: ids[0], color: "primary" },
                  ])
                })
              } else {
                const listIds = newValue.filter(
                  label => typeof label !== "string" && label.id === "",
                ) as Label[]
                if (listIds.length) {
                  createLabel({
                    name: listIds[0].inputValue ?? "",
                    color: "primary",
                  }).then(doc => {
                    formik.setFieldValue("labels", [
                      ...newValue.filter(
                        label => typeof label !== "string" && label.id !== "",
                      ),
                      {
                        id: doc.id,
                        name: listIds[0].inputValue,
                        color: "primary",
                      },
                    ])
                  })
                } else {
                  formik.setFieldValue("labels", newValue)
                }
                // formik.setFieldValue("labels", newValue)
              }
            }}
            options={labels}
            getOptionLabel={option => {
              if (typeof option === "string") {
                return option
              }
              if (option.inputValue) {
                return option.inputValue
              }
              return option.name
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index })
                return <Chip key={key} label={option.name} {...tagProps} />
              })
            }
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              const { inputValue } = params

              // Suggest the creation of a new value
              const isExisting = options.some(
                option => inputValue === option.name,
              )
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  id: "",
                  name: `Add "${inputValue}"`,
                  color: "primary",
                  inputValue,
                })
              }
              return filtered
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props
              return (
                <li key={key} {...optionProps}>
                  {option.name}
                </li>
              )
            }}
            freeSolo
            renderInput={params => (
              <TextField
                {...params}
                label="Fixed tag"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>
      </Grid>
      <input type="submit" hidden disabled={!formik.isValid || !formik.dirty} />
    </form>
  )
}

export default TaskForm
