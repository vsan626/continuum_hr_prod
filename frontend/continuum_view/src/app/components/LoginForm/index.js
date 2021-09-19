import * as React from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import Button from '../Button';
import MuiInput from '../Input';
import { logIn } from '../../../api/login';
import { getToken } from '../../../utils/localStorage';
import { getEmployees } from '../../..//api/getEmployees';

const initialValues = {
  loginUsername: '',
  loginPassword: ''
};

const validationSchema = object().shape({
  loginUsername: string().required('Username is a required field'),
  loginPassword: string().required('Password is a required field')
});

const LoginForm = ({ setAuth }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorErrorMessage, setPasswordErrorMessage] =
    React.useState('');

  const handleSubmit = async (values) => {
    console.log('login values', values);

    setPasswordError(false);
    setPasswordErrorMessage('');
    setUsernameError(false);
    setUsernameErrorMessage('');
    setIsLoading(true);

    try {
      const loginRes = await logIn(values);

      if (loginRes.status === 200) {
        setAuth(() => {
          return getToken();
        });
      }
      console.log({ loginRes });
    } catch (err) {
      const { data } = err;
      if (data.message === `username ${values.loginUsername} not found`) {
        setUsernameError(true);
        setUsernameErrorMessage(data.message);
      } else if (data.message === 'Incorrect password') {
        setPasswordError(true);
        setPasswordErrorMessage(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form onSubmit={props.handleSubmit}>
            <div>
              <MuiInput
                id="loginUsername"
                name="loginUsername"
                value={props.values.loginUsername}
                label="Username"
                error={usernameError}
                errorMessage={usernameErrorMessage}
                onChange={props.handleChange}
              />
            </div>

            <div>
              <MuiInput
                id="loginPassword"
                name="loginPassword"
                value={props.values.loginPassword}
                label="Password"
                error={passwordError}
                errorMessage={passwordErrorErrorMessage}
                onChange={props.handleChange}
              />
            </div>

            <div>
              <Button isLoading={isLoading} type="submit">
                submit
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
