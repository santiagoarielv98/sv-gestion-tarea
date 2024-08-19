import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string().min(3).max(30).required('Name is required'),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().min(6).max(255).required('Password is required')
});
