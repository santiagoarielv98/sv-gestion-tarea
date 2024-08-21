import { useFormikContext } from 'formik';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import type { Task } from '@/features/tasks/types/task';

import { useCreateLabelMutation, useGetLabelsQuery } from '../labelApi';
import type { Tag } from '../types/tag';

const filter = createFilterOptions<Tag>();

function isMatchingLabelName(value: string) {
  return (label: Tag) => label.title === value;
}

function LabelAutoComplete() {
  const formik = useFormikContext<Task>();
  const { data: labels = [], isLoading: loading } = useGetLabelsQuery();
  const [addLabel] = useCreateLabelMutation();
  const values = formik.values.tags ?? [];

  const handleChange = async (_event: React.SyntheticEvent, newValue: (string | Tag)[]) => {
    if (newValue.length === 0) {
      setLabels([]);

      return;
    }

    let newLabel = newValue.pop()!;

    if (!newLabel) return;

    if (typeof newLabel === 'string') {
      if ((newValue as Tag[]).some(isMatchingLabelName(newLabel))) {
        return;
      }
      const foundLabel = [...labels].find(isMatchingLabelName(newLabel));

      if (foundLabel) {
        setLabels([...(newValue as Tag[]), foundLabel]);
        return;
      }

      newLabel = await addLabel({ title: newLabel }).unwrap();
    }

    if (newLabel._id === '') {
      newLabel = await addLabel({ title: newLabel.title }).unwrap();
    }
    if ((newValue as Tag[]).some(isMatchingLabelName(newLabel.title))) {
      return;
    }

    setLabels([...(newValue as Tag[]), newLabel]);
  };

  function setLabels(labels: Tag[]) {
    formik.setFieldValue('tags', labels);
  }

  return (
    <Autocomplete
      autoFocus
      freeSolo
      value={values}
      filterSelectedOptions
      onChange={handleChange}
      multiple
      id="labels"
      options={labels}
      getOptionLabel={(option) => (option as Tag).title}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderInput={(params) => <TextField {...params} label="Labels" placeholder="Add label" />}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const isExisting =
          values.some(isMatchingLabelName(params.inputValue)) || labels.some(isMatchingLabelName(params.inputValue));
        if (params.inputValue !== '' && !isExisting) {
          filtered.push({
            _id: '',
            inputValue: `Add "${params.inputValue}"`,
            title: params.inputValue
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      disabled={loading}
      renderOption={({ key, ...props }, option) => (
        <li key={key} {...props}>
          {option.inputValue ? option.inputValue : option.title}
        </li>
      )}
    />
  );
}

export default LabelAutoComplete;
