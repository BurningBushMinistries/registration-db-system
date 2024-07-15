/* eslint-disable */

import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  colors
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
const dev_BASE_URL = "http://localhost:3000/" 
// const BASE_URL = 'https://bbmapi20230807123059.azurewebsites.net/api/';
const BASE_URL = 'https://bbm-bulk-api-gct.vercel.app/';
const axios = require('axios');
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*'
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectPass, setIncorrectPasswword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      validateLoginUser();
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleIncorrectPasswword = (incorrectPass) => {
    setIncorrectPasswword(incorrectPass);
  };

  const validateLoginUser = async () => {
    const loginObject = {
      username : {...getFieldProps('username')}.value,
      password : {...getFieldProps('password')}.value
    }

    try {
      await axios.post(BASE_URL + 'Login',loginObject,{
        mode: 'cors',
        headers: headers
            })
      .then(function(response) {
        console.log('Authenticated',response);
        handleIncorrectPasswword(false);
        navigate('/app/home', { replace: true });

      }).catch(function(error) {
        handleIncorrectPasswword(true);
        console.log('Error on Authentication',error);
        console.log('handleIncorrectPasswword',incorrectPass);

        // navigate('/login', { replace: true });
      });
    } catch (err) {
      console.log(err);
      incorrectPass = true;
      throw err;
      
    }
 
  };
  

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            label="User name"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <Stack>
        {incorrectPass ? <div style={{color:'red'}}>
          INCORRECT PASSWORD OR USERNAME!!
        </div> : ""}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting && !incorrectPass}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
