import FormHelperText from '@mui/material/FormHelperText';

interface ErrorData {
  message: string | null;
  errors?: string[];
}

function transformError(error: unknown) {
  if (typeof error === 'object' && error !== null) {
    if ('data' in error) {
      return error.data as ErrorData;
    }
  }
  return { message: null };
}

export function renderError(error: unknown) {
  const { message, errors } = transformError(error);
  return (
    <>
      <FormHelperText error>{message}</FormHelperText>
      {errors &&
        errors.map((err) => (
          <FormHelperText key={err} error>
            {err}
          </FormHelperText>
        ))}
    </>
  );
}
