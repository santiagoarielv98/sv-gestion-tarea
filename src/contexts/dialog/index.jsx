import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { Field, Form, Formik } from 'formik';
import { createContext, useContext } from 'react';

import startCase from 'lodash/startCase';
import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return { ...state, ...action.payload, open: true };
    case 'close':
      return { ...state, open: false };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  open: false,
  title: 'Dialog Title',
  contentText: 'Dialog content text',
  cancelButton: { children: 'Cancel' },
  submitButton: { children: 'Submit' },
  fields: {},
  onSubmit: () => Promise.resolve(),
  dialogProps: {
    onClose: () => null,
    fullWidth: true,
    maxWidth: 'sm'
  },
  slots: {
    dialogTitleProps: {},
    dialogContentProps: {},
    dialogContentTextProps: {},
    dialogActionsProps: {},
    formikProps: {}
  },
  customContent: undefined
};

const DialogContext = createContext({
  openDialog: () => null,
  closeDialog: () => null
});

export const DialogProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);
  const {
    open,
    onSubmit,
    title,
    contentText,
    fields,
    validationSchema,
    cancelButton,
    submitButton,
    dialogProps: { onClose, ...dialogProps } = {},
    slots: sp,
    customContent
  } = value;

  const initialValues = getInitialValues(fields);

  const openDialog = (options) => dispatch({ type: 'open', payload: options });
  const closeDialog = () => dispatch({ type: 'close' });
  const handleExited = () => dispatch({ type: 'reset' });
  const handleSubmit = (values, formikHelpers) => {
    if (!onSubmit) return;
    onSubmit(values, formikHelpers).then(closeDialog);
  };
  const fieldComponents = Object.entries(fields ?? {}).map(([name, { gridProps, onChange, ...fieldOptions }]) => (
    <Grid item xs={12} {...gridProps} key={name}>
      <Stack spacing={1}>
        <Field name={name}>
          {({ meta, field, form }) => {
            return fieldOptions && 'component' in fieldOptions ? (
              <fieldOptions.component
                type={fieldOptions?.fieldProps?.type}
                name={form.name}
                value={form.values[name] ?? null}
                onBlur={form.handleBlur}
                label={fieldOptions?.label || startCase(name)}
                {...fieldOptions?.fieldProps}
                error={form.dirty && meta.touched && !!meta.error}
                onChange={onChange?.(form.setFieldValue)}
              />
            ) : (
              <TextField
                label={fieldOptions?.label || startCase(name)}
                {...fieldOptions?.fieldProps}
                {...field}
                value={field.value ?? ''}
                id={name}
                name={name}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={form.dirty && meta.touched && !!meta.error}
                aria-describedby={`${name}-helper-text`}
                InputProps={{
                  label: '',
                  sx: {
                    mt: 1
                  }
                }}
              />
            );
          }}
        </Field>
      </Stack>
    </Grid>
  ));

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formProps) => (
          <Dialog
            open={open}
            TransitionProps={{
              onExited: handleExited
            }}
            {...dialogProps}
            onClose={() => onClose?.(formProps)}
          >
            {customContent ? (
              customContent
            ) : (
              <Form {...sp?.formikFormProps}>
                <DialogTitle {...sp?.dialogTitleProps}>{title}</DialogTitle>
                <Divider />
                <DialogContent {...sp?.dialogContentProps}>
                  {contentText && <DialogContentText {...sp?.dialogContentTextProps}>{contentText}</DialogContentText>}
                  <Grid container spacing={3}>
                    {!!fieldComponents.length && fieldComponents}
                  </Grid>
                </DialogContent>
                <Divider />
                <DialogActions {...sp?.dialogActionsProps}>
                  <Grid container justifyContent="space-between">
                    <Grid item>{sp?.dialogActionsProps?.children}</Grid>
                    <Grid item>
                      {cancelButton && 'component' in cancelButton ? (
                        cancelButton.component
                      ) : cancelButton ? (
                        <Button
                          sx={{ mr: 1 }}
                          onClick={() => onClose?.(formProps)}
                          color="primary"
                          disabled={formProps.isSubmitting}
                          {...cancelButton.props}
                        >
                          {cancelButton.children}
                        </Button>
                      ) : null}
                      {submitButton && 'component' in submitButton ? (
                        submitButton.component
                      ) : submitButton ? (
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          disabled={formProps.isSubmitting}
                          {...submitButton.props}
                        >
                          {submitButton.children}
                        </Button>
                      ) : null}
                    </Grid>
                  </Grid>
                </DialogActions>
              </Form>
            )}
          </Dialog>
        )}
      </Formik>
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

const getInitialValues = (fields) => {
  return Object.fromEntries(
    Object.entries(fields ?? {}).map(([name, fieldOptions]) => [name, fieldOptions.initialValue])
  );
};
