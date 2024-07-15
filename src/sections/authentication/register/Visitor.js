/* eslint-disable */

import * as Yup from 'yup';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button
} from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { LoadingButton } from '@mui/lab';
import _ from 'lodash';
import { BASE_URL } from 'src/utils/constant';
// component
// ----------------------------------------------------------------------

export default function VisitorForm() {
  const navigate = useNavigate();
  const axios = require('axios');

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    surname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    address: Yup.string().required('Address is required'),
    maritalStatus: Yup.string().required('Marital status is required'),
    contactNumber: Yup.string().required('Contact number is required'),
    churchId: Yup.string().required('ChurchId is required'),
    gender: Yup.string().required('Gender is required'),
    month: Yup.string().required('Month is required')
  });

  const addUsers = async (userObject) => {
    try {
      const response = await axios.post(
        BASE_URL + 'Person',
        userObject,
        {
          mode: 'cors',
          headers: headers
        }
      );
      console.log(response);
      if (response) {
        navigate('/app/dashboard', { replace: true });
      } else {
        navigate('/add-visitor', { replace: true });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      address: '',
      maritalStatus: '',
      contactNumber: '',
      gender: 0,
      churchId: 1,
      comments: '',
      cellLocation:'',
      cellLeader:'',
      church:'',
      region:'',
      seedContribution:0,
      regContribution:0,
      amount:0
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const registrationObject = {
        name: { ...getFieldProps('name') }.value,
        surname: { ...getFieldProps('surname') }.value,
        address: { ...getFieldProps('address') }.value,
        maritalStatus: { ...getFieldProps('maritalStatus') }.value,
        contactNumber: { ...getFieldProps('contactNumber') }.value,
        gender: parseInt({ ...getFieldProps('gender') }.value),
        comments: { ...getFieldProps('comments') }.value,
        churchId: 1,
        cellLocation: {...getFieldProps('cellLocation')}.value,
        cellLeader: {...getFieldProps('cellLeader')}.value,
      };
      console.log('Values: ', registrationObject);
      addUsers(registrationObject);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const Input = styled('input')({
    display: 'none'
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('surname')}
              error={Boolean(touched.surname && errors.surname)}
              helperText={touched.surname && errors.surname}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="contactNumber"
            label="Contact Number"
            {...getFieldProps('contactNumber')}
            error={Boolean(touched.contactNumber && errors.contactNumber)}
            helperText={touched.contactNumber && errors.contactNumber}
          />

          <TextField
            fullWidth
            autoComplete="region"
            label="Region"
            {...getFieldProps('region')}
            error={Boolean(touched.region && errors.region)}
            helperText={touched.region && errors.region}
          />

          <TextField
            fullWidth
            label="Address"
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Church"
              {...getFieldProps('church')}
              error={Boolean(touched.church && errors.church)}
              helperText={touched.church && errors.church}
            />

            <TextField
              fullWidth
              label="Month"
              {...getFieldProps('amount')}
              error={Boolean(touched.amount && errors.amount)}
              helperText={touched.amount && errors.amount}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Seed Contribution"
              {...getFieldProps('seedContribution')}
              error={Boolean(touched.seedContribution && errors.seedContribution)}
              helperText={touched.seedContribution && errors.seedContribution}
            />

            <TextField
              fullWidth
              label="Seed Pledge"
              {...getFieldProps('regContribution')}
              error={Boolean(touched.regContribution && errors.regContribution)}
              helperText={touched.regContribution && errors.regContribution}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Target Progress (%)"
              {...getFieldProps('seedContribution')}
              error={Boolean(touched.seedContribution && errors.seedContribution)}
              helperText={touched.seedContribution && errors.seedContribution}
            />

            <TextField
              fullWidth
              label="Registration Contribution"
              {...getFieldProps('regContribution')}
              error={Boolean(touched.regContribution && errors.regContribution)}
              helperText={touched.regContribution && errors.regContribution}
            />
          </Stack>

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              {...getFieldProps('gender')}
            >
              <FormControlLabel value='0' control={<Radio />} label="Female" />
              <FormControlLabel value='1' control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register Member
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
