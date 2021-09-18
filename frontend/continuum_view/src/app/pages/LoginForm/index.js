import * as React from 'react';
import { Formik, Form } from 'formik';
import Button from '../Button';
import Input from '../Input';
import { logIn } from '../../../api/login';

const initialValues = {
  username: '',
  password: ''
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorErrorMessage, setPasswordErrorMessage] =
    React.useState('');

  const handleSubmit = async (values) => {
    try {
      await logIn(values);
      // set loading icon on button
    } catch (err) {
      console.log('error from handleSubmit', err);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => {
        return (
          <Form>
            <div>
              <Input
                id="userName"
                value={props.values.username}
                placeholder="Username"
                usernameError={usernameError}
                usernameErrorMessage="test"
              />
            </div>
            <div>
              <Input
                id="password"
                value={props.values.password}
                placeholder="Username"
                usernameError={passwordError}
                usernameErrorMessage="test pass"
              />
            </div>
            <div>
              <Button type="submit" isLoading={isLoading}>
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
