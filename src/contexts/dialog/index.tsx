/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import type * as Yup from 'yup';

import type {
  ButtonProps,
  DialogActionsProps,
  DialogContentProps,
  DialogContentTextProps,
  DialogProps,
  DialogTitleProps,
  GridProps
} from '@mui/material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import type { FieldAttributes, FieldProps, FormikFormProps, FormikHelpers, FormikProps } from 'formik';
import { Field, Form, Formik } from 'formik';
import { createContext } from 'react';

// import { TextField } from 'formik-material-ui';
import startCase from 'lodash/startCase';
import { useReducer } from 'react';

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
    component?: React.FunctionComponent<any>;
    gridProps?: GridProps;
    onChange?: (setFieldValue: FormikProps<any>['setFieldValue']) => (event: React.ChangeEvent<any>) => void;
  }
>;

/**
 * Turns ObjectShape into a generic.
 * See: https://github.com/jquense/yup/blob/3b67dc0b59c8cf05fb5ee00b1560a2ab68ca3918/src/object.ts#L30
 */
type YupObjectShape<T extends string> = Record<T, Yup.AnySchema | Yup.Reference | Yup.Lazy<any, any>>;

export type DialogOptions<
  FieldNames extends string = string,
  Fields = FieldOptions<FieldNames>,
  Values = Record<keyof Fields, string>
> = Partial<{
  title: string | React.ReactNode;
  fields: Fields;
  validationSchema: Yup.ObjectSchema<YupObjectShape<FieldNames>>;
  cancelButton: ActionButtonOptions;
  submitButton: ActionButtonOptions;
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => Promise<any>;
  dialogProps: Omit<DialogProps, 'open' | 'onClose'> & { onClose?: (formikProps: FormikProps<Values>) => void };
  subcomponentProps: {
    dialogTitleProps?: DialogTitleProps;
    dialogContentProps?: DialogContentProps;
    dialogContentTextProps?: DialogContentTextProps;
    dialogActionsProps?: DialogActionsProps;
    formikProps?: Partial<FormikProps<Values>>;
    formikFormProps?: FormikFormProps;
  };
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
  cancelButton: { children: 'Cancel' },
  submitButton: { children: 'Submit' },
  fields: {},
  onSubmit: () => Promise.resolve(),
  dialogProps: {
    fullWidth: true,
    maxWidth: 'sm'
  },
  subcomponentProps: {
    dialogTitleProps: {},
    dialogContentProps: {},
    dialogContentTextProps: {},
    dialogActionsProps: {},
    formikProps: {}
  }
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
  // The warning [Warning: findDOMNode is deprecated in StrictMode.] is a known issue:
  // https://stackoverflow.com/a/63729408
  const [value, dispatch] = useReducer(reducer, initialState);
  const {
    open,
    onSubmit,
    title,
    fields,
    validationSchema,
    cancelButton,
    submitButton,
    dialogProps: { onClose, ...dialogProps } = {},
    subcomponentProps: sp
  } = value;

  const initialValues = getInitialValues(fields);

  const openDialog: OpenDialog = (options) => dispatch({ type: 'open', payload: options as DialogOptions });
  const closeDialog = () => dispatch({ type: 'close' });
  const handleExited = () => dispatch({ type: 'reset' });
  const handleSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
    if (!onSubmit) return;
    onSubmit(values, formikHelpers).then(closeDialog);
  };

  const fieldComponents = Object.entries(fields ?? {}).map(([name, { gridProps, onChange, ...fieldOptions }]) => {
    return (
      <Grid item xs={12} {...gridProps} key={name}>
        <Stack spacing={1}>
          <Field
            variant="outlined"
            fullWidth
            label={fieldOptions?.label || startCase(name)}
            {...fieldOptions.fieldProps}
            name={name}
            key={name}
          >
            {({ meta, field, form }: FieldProps<any>) => {
              const Component = fieldOptions.component!;

              return 'component' in fieldOptions ? (
                <Component
                  name={name}
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
  });

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        {...sp?.formikProps}
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
            <Form {...sp?.formikFormProps}>
              <DialogTitle {...sp?.dialogTitleProps}>{title}</DialogTitle>
              <Divider />
              <DialogContent {...sp?.dialogContentProps}>
                {/* {contentText && <DialogContentText {...sp?.dialogContentTextProps}>{contentText}</DialogContentText>} */}
                {!!fieldComponents.length && fieldComponents}
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
                        onClick={closeDialog}
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
                      <Button type="submit" color="primary" disabled={formProps.isSubmitting} {...submitButton.props}>
                        {submitButton.children}
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </DialogActions>
            </Form>
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
