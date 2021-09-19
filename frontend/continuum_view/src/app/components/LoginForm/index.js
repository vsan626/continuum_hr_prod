import * as React from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import Button from '../Button';
import MuiInput from '../Input';
import { logIn } from '../../../api/login';
import { getToken } from '../../../utils/localStorage';
import { makeStyles } from '@material-ui/core/styles';

const initialValues = {
  loginUsername: '',
  loginPassword: ''
};

const validationSchema = object().shape({
  loginUsername: string().required('Username is a required field'),
  loginPassword: string().required('Password is a required field')
});

const LoginForm = ({ setAuth, customStyles }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorErrorMessage, setPasswordErrorMessage] =
    React.useState('');
  const cc = useStyles();

  const handleSubmit = async (values) => {
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
        console.log('loginform fomike', customStyles);
        return (
          <Form onSubmit={props.handleSubmit}>
            <div className={cc.loginUsernameInput}>
              <MuiInput
                id="loginUsername"
                name="loginUsername"
                value={props.values.loginUsername}
                label="Username"
                error={usernameError}
                errorMessage={usernameErrorMessage}
                onChange={props.handleChange}
                customStyles={customStyles}
              />
            </div>

            <div>
              <MuiInput
                id="loginPassword"
                name="loginPassword"
                type="password"
                value={props.values.loginPassword}
                label="Password"
                error={passwordError}
                errorMessage={passwordErrorErrorMessage}
                onChange={props.handleChange}
              />
            </div>

            <div className={cc.buttonWrapper}>
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

// TODO: style to MuiInput wrapper and button wrapper
const useStyles = makeStyles({
  buttonWrapper: {
    padding: '20px 0px 20px 5px'
  },
  loginUsernameInput: {
    padding: '20px 0px'
  }
});

export default LoginForm;
