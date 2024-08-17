import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';
import { useCreateLabelMutation, useGetLabelsQuery } from '../labelApi';

const filter = createFilterOptions();

function isMatchingLabelName(value) {
  return (label) => label.title === value;
}

function LabelAutoComplete() {
  const formik = useFormikContext();
  const { data: labels = [], isLoading: loading } = useGetLabelsQuery();
  const [addLabel] = useCreateLabelMutation();
  const values = formik.values.labels ?? [];

  const handleChange = async (_event, newValue) => {
    if (newValue.length === 0) {
      setLabels([]);

      return;
    }

    let newLabel = newValue.pop();

    if (!newLabel) return;

    if (typeof newLabel === 'string') {
      if (newValue.some(isMatchingLabelName(newLabel))) {
        return;
      }
      const foundLabel = [...labels].find(isMatchingLabelName(newLabel));

      if (foundLabel) {
        setLabels([...newValue, foundLabel]);
        return;
      }

      newLabel = await addLabel(newLabel).unwrap();
    }

    if (newLabel._id === '') {
      newLabel = await addLabel(newLabel.title).unwrap();
    }
    if (newValue.some(isMatchingLabelName(newLabel.title))) {
      return;
    }

    setLabels([...newValue, newLabel]);
  };

  function setLabels(labels) {
    formik.setFieldValue('labels', labels);
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
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderInput={(params) => <TextField {...params} label="Labels" placeholder="Add label" />}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const isExisting = values.some(isMatchingLabelName(params.inputValue)) || labels.some(isMatchingLabelName(params.inputValue));
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
