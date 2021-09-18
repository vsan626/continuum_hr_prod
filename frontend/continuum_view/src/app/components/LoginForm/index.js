import * as React from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import Button from '../Button';
import MuiInput from '../Input';
import { logIn } from '../../../api/login';

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = object().shape({
  username: string().required('Username is a required field'),
  password: string().min(6).required('Password is a required field')
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorErrorMessage, setPasswordErrorMessage] =
    React.useState('');

  const handleSubmit = async (values) => {
    console.log('in handle', values);
    try {
      await logIn(values);
      // set loading icon on button
    } catch (err) {
      console.log('error from handleSubmit', err);
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
                id="username"
                name="username"
                value={props.values.username}
                placeholder="Username"
                usernameError={usernameError}
                usernameErrorMessage="test"
                onChange={props.handleChange}
              />
            </div>
            <div>
              <MuiInput
                id="password"
                name="password"
                value={props.values.password}
                placeholder="Password"
                usernameError={passwordError}
                usernameErrorMessage="test pass"
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
