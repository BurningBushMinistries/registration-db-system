/* eslint-disable */

import * as Yup from 'yup';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { LoadingButton } from '@mui/lab';
import _ from 'lodash';
import { BASE_URL } from 'src/utils/constant';
// component
// ----------------------------------------------------------------------

export default function EventForm() {
  const navigate = useNavigate();
  const axios = require('axios');

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string(),
    time: Yup.string(),
    dayFrom: Yup.string(),
    dayTo: Yup.string(),
    month: Yup.string(),
    year: Yup.string(),
    department: Yup.string(),
    region: Yup.string()
  });

  const addCalendar = async (statsObject) => {
    try {
      const response = await axios.post(
        BASE_URL + 'Calendar',
        statsObject,
        {
          mode: 'cors',
          headers: headers
        }
      );
      console.log(response);
      if (response) {
        navigate('/app/event-display', { replace: true });
      } else {
        navigate('/add-event', { replace: true });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: 'New Year',
      time: "00:00",
      dayFrom: 1,
      dayTo: 2,
      month: 'January',
      year: '2023',
      department: 'Ministry',
      region: 'National',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const registrationObject = {
        name: { ...getFieldProps('name') }.value,
        time: { ...getFieldProps('time') }.value,
        dayFrom: { ...getFieldProps('dayFrom') }.value,
        dayTo: { ...getFieldProps('dayTo') }.value,
        month: { ...getFieldProps('month') }.value,
        year: { ...getFieldProps('year') }.value,
        department: { ...getFieldProps('department') }.value,
        region: { ...getFieldProps('region') }.value,
      };
      console.log('Values: ', registrationObject);
      addCalendar(registrationObject);
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
              label="Event Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              label="Time"
              {...getFieldProps('time')}
              error={Boolean(touched.time && errors.time)}
              helperText={touched.time && errors.time}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="Start Day"
            label="Start Day"
            {...getFieldProps('dayFrom')}
            error={Boolean(touched.dayFrom && errors.dayFrom)}
            helperText={touched.dayFrom && errors.dayFrom}
          />

          <TextField
            fullWidth
            autoComplete="dayTo"
            label="End Day"
            {...getFieldProps('dayTo')}
            error={Boolean(touched.dayTo && errors.dayTo)}
            helperText={touched.dayTo && errors.dayTo}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Month"
              {...getFieldProps('month')}
              error={Boolean(touched.month && errors.month)}
              helperText={touched.month && errors.month}
            />

            <TextField
              fullWidth
              label="Year"
              {...getFieldProps('year')}
              error={Boolean(touched.year && errors.year)}
              helperText={touched.year && errors.year}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Department"
              {...getFieldProps('department')}
              error={Boolean(touched.department && errors.department)}
              helperText={touched.department && errors.department}
            />

            <TextField
              fullWidth
              label="Region"
              {...getFieldProps('region')}
              error={Boolean(touched.region && errors.region)}
              helperText={touched.region && errors.region}
            />
          </Stack>


          {/* <TextField
            fullWidth
            label="Date"
            type="date"
            {...getFieldProps('date')}
            error={Boolean(touched.date && errors.date)}
            helperText={touched.date && errors.date}
          /> */}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add Event
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
