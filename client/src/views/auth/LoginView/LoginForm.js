import React from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios'
import { API_URL, LOGIN_SUCCESS, LOGIN_FAILED } from 'src/actionTypes';

const useStyles = makeStyles(() => ({
  alignCenter:{
    textAlign:'center'
  }
}));

function LoginForm({ className, onSubmitSuccess, login, user, ...rest }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string()
          .max(255)
          .required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        axios
          .post(`${API_URL}/auth/login`, values)
          .then(res => {
            const accessToken = res.data.auth_token;
            localStorage.setItem('access_token', accessToken);
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

            const user = res.data.user;
            dispatch({
              type: LOGIN_SUCCESS,
              res: user
            });
            onSubmitSuccess();
          })
          .catch(err => {
            const { error } = err.response.data;
            console.log('error2', error);
            dispatch({
              type: LOGIN_FAILED,
              error
            });
            const message = error || 'Something went wrong';

            setStatus({ success: false });
            setErrors({ submit: message });
          });
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
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
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
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText className={classes.alignCenter} error>
                {errors.submit}{' '}
              </FormHelperText>
            </Box>
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
              Log In
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {}
};

export default LoginForm;
