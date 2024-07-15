/* eslint-disable */

import * as Yup from 'yup';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField
} from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { LoadingButton } from '@mui/lab';
import _ from 'lodash';
import { BASE_URL } from 'src/utils/constant';
// component
// ----------------------------------------------------------------------

export default function StatsForm() {
  const navigate = useNavigate();
  const axios = require('axios');

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
};

  const RegisterSchema = Yup.object().shape({
    branch: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Branch name required'),
    churchName: Yup.string().required('Church name is required'),
    city: Yup.string().required('City is required'),
    location: Yup.string().required('Location is required'),
    province: Yup.string().required('Province is required'),
    region: Yup.string().required('Region is required')
  });

  const addChurch = async (churchObject) => {
    try {
      const response = await axios.post(BASE_URL + 'Church',churchObject,{
        mode: 'cors',
        headers: headers
    });
    console.log(response)
      if(response){
        navigate('/app/dashboard', { replace: true });
      }
      else{
        navigate('/add-church', { replace: true });
      }
    
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const formik = useFormik({
    initialValues: {
      branch: '',
      churchId : 1,
      churchName : '',
      city : '',
      location : '',
      pastorId : 1,
      province : '',
      region : ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const registrationObject = {
        branch: {...getFieldProps('branch')}.value,
        churchName: {...getFieldProps('churchName')}.value,
        city: {...getFieldProps('city')}.value,
        location: {...getFieldProps('location')}.value,
        pastorId: 1,
        province: {...getFieldProps('province')}.value,
        region: {...getFieldProps('region')}.value
      };
      console.log("Values: ", registrationObject);
      addChurch(registrationObject);
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
              label="Branch name"
              {...getFieldProps('branch')}
              error={Boolean(touched.branch && errors.branch)}
              helperText={touched.branch && errors.branch}
            />

            <TextField
              fullWidth
              label="Church name"
              {...getFieldProps('churchName')}
              error={Boolean(touched.churchName && errors.churchName)}
              helperText={touched.churchName && errors.churchName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="City"
            label="City"
            {...getFieldProps('city')}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />

          <TextField
            fullWidth
            autoComplete="location"
            label="Location"
            {...getFieldProps('location')}
            error={Boolean(touched.location && errors.location)}
            helperText={touched.location && errors.location}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Pastor"
              {...getFieldProps('pastorId')}
              error={Boolean(touched.pastorId && errors.pastorId)}
              helperText={touched.pastorId && errors.pastorId}
            />

            <TextField
              fullWidth
              label="Province"
              {...getFieldProps('province')}
              error={Boolean(touched.province && errors.province)}
              helperText={touched.province && errors.province}
            />
          </Stack>

          <TextField
            fullWidth
            label="Region"
            {...getFieldProps('region')}
            error={Boolean(touched.region && errors.region)}
            helperText={touched.region && errors.region}
          />
    
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add Church
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
