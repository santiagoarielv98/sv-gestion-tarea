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
import { createContext } from 'react';

import startCase from 'lodash/startCase';
import { useReducer } from 'react';

import * as React from 'react';
import type * as Yup from 'yup';

import type {
  ButtonProps,
  DialogActionsProps,
  DialogContentProps,
  DialogContentTextProps,
  DialogProps,
  DialogTitleProps
} from '@mui/material';
import type { FieldAttributes, FormikFormProps, FormikHelpers, FormikProps } from 'formik';

// import type Lazy from 'yup/lib/Lazy';
// import type Reference from 'yup/lib/Reference';

export type ActionButtonOptions =
  | false
  | { children: string | React.ReactNode; props?: ButtonProps }
  | { component: React.ReactNode };

export type FieldOptions<T extends string = string> = Record<
  T,
  {
    initialValue: any;
    label?: string;
    fieldProps?: FieldAttributes<any>;
    component?: React.ReactNode;
  }
>;

type YupObjectShape<T extends string> = Record<T, Yup.AnySchema | Yup.Reference | Yup.Lazy<any, any>>;

export type DialogOptions<
  FieldNames extends string = string,
  Fields = FieldOptions<FieldNames>,
  Values = Record<keyof Fields, string>
> = Partial<{
  title: string | React.ReactNode;
  contentText: string | React.ReactNode;
  fields: Fields;
  validationSchema: Yup.ObjectSchema<YupObjectShape<FieldNames>>;
  cancelButton: ActionButtonOptions;
  submitButton: ActionButtonOptions;
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => Promise<any>;
  dialogProps: Omit<DialogProps, 'open'>;
  slots: {
    dialogTitleProps?: DialogTitleProps;
    dialogContentProps?: DialogContentProps;
    dialogContentTextProps?: DialogContentTextProps;
    dialogActionsProps?: DialogActionsProps;
    formikProps?: Partial<FormikProps<Values>>;
    formikFormProps?: FormikFormProps;
  };
  customContent: undefined | React.ReactNode;
}>;

type OpenDialogAction = {
  type: 'open';
  payload: DialogOptions;
};
type CloseDialogAction = { type: 'close' };
type ResetDialogAction = { type: 'reset' };
type Actions = OpenDialogAction | CloseDialogAction | ResetDialogAction;
type State = { open: boolean } & DialogOptions;

const reducer = (state: State, action: Actions): State => {
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

const initialState: State = {
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
export type OpenDialog = <T extends string>(options: DialogOptions<T>) => void;

type ContextType = {
  openDialog: OpenDialog;
  closeDialog: () => void;
};

export const DialogContext = createContext<ContextType>({
  openDialog: () => null,
  closeDialog: () => null
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
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

  const openDialog: OpenDialog = (options) => dispatch({ type: 'open', payload: options });
  const closeDialog = () => dispatch({ type: 'close' });
  const handleExited = () => dispatch({ type: 'reset' });
  const handleSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
    if (!onSubmit) return;
    onSubmit(values, formikHelpers).then(closeDialog);
  };

  const fieldComponents = Object.entries(fields ?? {}).map(([name, fieldOptions]) => (
    <FormField key={name} name={name} options={fieldOptions} />
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

const getInitialValues = (fields: DialogOptions['fields']) => {
  return Object.fromEntries(
    Object.entries(fields ?? {}).map(([name, fieldOptions]) => [name, fieldOptions.initialValue])
  );
};

function FormField({ options, name }: { options: FieldOptions; name: string }) {
  const { gridProps, onChange, ...fieldOptions } = options;
  return (
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
              />
            );
          }}
        </Field>
      </Stack>
    </Grid>
  );
}
