import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { register } from 'src/actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {},
  select:{
    width:505
  }
}));

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role:'',
        policy: false
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .max(255)
          .required('First name is required'),
        lastName: Yup.string()
          .max(255)
          .required('Last name is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string()
          .min(7)
          .max(255)
          .required('Password is required'),
        role: Yup.string()
          .required('Role is required'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await dispatch(register(values));
          onSubmitSuccess();
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.firstName && errors.firstName)}
            fullWidth
            helperText={touched.firstName && errors.firstName}
            label="First Name"
            margin="normal"
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            type="firstName"
            value={values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.lastName && errors.lastName)}
            fullWidth
            helperText={touched.lastName && errors.lastName}
            label="Last Name"
            margin="normal"
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            type="lastName"
            value={values.lastName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <FormControl >
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="role"
              name="role"
              helperText={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
              className={classes.select}
            >
              <MenuItem value="lead_generator">Lead Generator</MenuItem>
              <MenuItem value="client_care_specialist">Client Care Specialist</MenuItem>
              <MenuItem value="call_center_agent">Call Center Agent</MenuItem>
              <MenuItem value="customer_service_agent">Customer Service Agent</MenuItem>
              <MenuItem value="sales_representative">Sales Representative</MenuItem>
              <MenuItem value="sales_manager">Sales Manager</MenuItem>
            </Select>
          </FormControl>
          {Boolean(touched.role && errors.role) && (
            <FormHelperText error>{errors.role}</FormHelperText>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create account
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => {}
};

export default RegisterForm;
