import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import React from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectLabelState } from "../redux/labels/labelSlice"
import { addLabel, type Label } from "../redux/labels/labelThunk"

interface ExtendedLabel extends Label {
  inputValue?: string
}

const filter = createFilterOptions<ExtendedLabel>()

function isMatchingLabelName(value: string) {
  return (label: Label) => label.title === value
}

function LabelAutoComplete() {
  const dispatch = useAppDispatch()
  const { labels, loading } = useAppSelector(selectLabelState)
  const [value, setValue] = React.useState<Label[]>([])

  const handleChange = async (
    _event: React.SyntheticEvent,
    newValue: (Label | string)[],
  ) => {
    if (newValue.length === 0) {
      setValue([])
      return
    }

    let newLabel = newValue.pop()

    if (!newLabel) return

    if (typeof newLabel === "string") {
      const foundLabel = [...(newValue as Label[]), ...labels].find(
        isMatchingLabelName(newLabel),
      )
      if (foundLabel) {
        setValue([...(newValue as Label[]), foundLabel])
        return
      }

      newLabel = await dispatch(addLabel({ title: newLabel })).unwrap()
    }

    setValue([...(newValue as Label[]), newLabel])
  }

  return (
    <Autocomplete
      autoFocus
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
        // Regular option
        return option.title
      }}
      renderInput={params => (
        <TextField {...params} label="Labels" placeholder="Labels" />
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        const isExisting =
          value.some(isMatchingLabelName(params.inputValue)) ||
          labels.some(isMatchingLabelName(params.inputValue))
        if (params.inputValue !== "" && !isExisting) {
          filtered.push({
            id: params.inputValue,
            color: params.inputValue,
            inputValue: `Add "${params.inputValue}"`,
            title: params.inputValue,
          })
        }
        return filtered
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      disabled={loading}
      renderOption={(props, option: ExtendedLabel) => {
        const { key, ...optionProps } = props
        return (
          <li key={option.id} {...optionProps}>
            {option.inputValue ? option.inputValue : option.title}
          </li>
        )
      }}
    />
  )
}

export default LabelAutoComplete
