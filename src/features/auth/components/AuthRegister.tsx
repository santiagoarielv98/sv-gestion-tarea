import { useState } from 'react';
import { Formik } from 'formik';

import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

import { useRegisterMutation } from '@/features/auth/authApi';
import type { RegisterCredentials } from '@/features/auth/types/auth';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';

import { registerSchema } from '../schemas/registerSchema';
import { renderError } from '../utils/errorHandle';

export default function AuthRegister() {
  const [register, { error }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (values: RegisterCredentials) => {
    await register(values).unwrap();
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">Name*</InputLabel>
                  <OutlinedInput
                    id="name"
                    type="text"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    aria-describedby="helper-text-name"
                    autoComplete="given-name"
                  />
                </Stack>
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-name">
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
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
                    onChange={(e) => {
                      handleChange(e);
                    }}
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
                    placeholder="******"
                    autoComplete="new-password"
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
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
