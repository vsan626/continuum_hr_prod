import * as React from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import Button from '../Button';
import MuiInput from '../Input';
import { register } from '../../../api/register';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const initialValues = {
  registerUsername: '',
  registerPassword: ''
};

const validationSchema = object().shape({
  registerUsername: string().required('Username is a required field'),
  registerPassword: string().required(
    'Password needs to be 6 characters or more'
  )
});

const RegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorErrorMessage, setPasswordErrorMessage] =
    React.useState('');
  const [success, setSuccess] = React.useState(false);
  const cc = useStyles();

  const handleSubmit = async (values, { resetForm }) => {
    setPasswordError(false);
    setPasswordErrorMessage('');
    setUsernameError(false);
    setUsernameErrorMessage('');
    setIsLoading(true);

    if (values.registerPassword.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(
        'Please enter a password with a length of 6 or more'
      );
      setIsLoading(false);
      return;
    }

    try {
      await register(values);
      // TODO: reset form once register is successful
      // resetForm({}); <-- not working currently
      setSuccess(true);
    } catch (err) {
      const { data } = err;
      if (data.message === `Username already exists.`) {
        setUsernameError(true);
        setUsernameErrorMessage(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(props) => {
          return (
            <Form onSubmit={props.handleSubmit}>
              <div className={cc.registerUsernameWrapper}>
                <MuiInput
                  id="registerUsername"
                  name="registerUsername"
                  value={props.values.registerUsername}
                  label="Username"
                  error={usernameError}
                  errorMessage={usernameErrorMessage}
                  onChange={props.handleChange}
                />
              </div>

              <div>
                <MuiInput
                  id="registerPassword"
                  name="registerPassword"
                  type="password"
                  value={props.values.registerPassword}
                  label="Password"
                  error={passwordError}
                  errorMessage={passwordErrorErrorMessage}
                  onChange={props.handleChange}
                />
              </div>

              <div className={cc.buttonWrapper}>
                <Button isLoading={isLoading} type="submit" color="success">
                  submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          sx={{ width: '100%' }}
        >
          User created successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

const useStyles = makeStyles({
  buttonWrapper: {
    padding: '20px 0px 20px 5px'
  },
  registerUsernameWrapper: {
    padding: '20px 0px'
  }
});

export default RegisterForm;
