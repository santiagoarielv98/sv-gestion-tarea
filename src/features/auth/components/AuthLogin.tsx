import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Formik } from 'formik';
import React from 'react';

import { credentials } from '@/config';
import { useLoginMutation } from '@/features/auth/authApi';
import type { LoginCredentials } from '@/features/auth/types/auth';

import { loginSchema } from '../schemas/loginSchema';
import { renderError } from '../utils/errorHandle';

export default function AuthLogin() {
  const [login, { error }] = useLoginMutation();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (values: LoginCredentials) => {
    await login({ email: values.email, password: values.password });
  };

  return (
    <Formik initialValues={credentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info">
                Use <strong>{credentials.email}</strong> and <strong>{credentials.password}</strong> to login.
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  autoComplete="email"
                  aria-describedby="helper-text-email"
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="helper-text-email">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                  aria-describedby="helper-text-password"
                />
              </Stack>
              {touched.password && errors.password && (
                <FormHelperText error id="helper-text-password">
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>
            {error && 'data' in error && (
              <Grid item xs={12}>
                {renderError(error)}
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
