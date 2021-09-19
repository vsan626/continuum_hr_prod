import * as React from 'react';
import LoginForm from '../../components/LoginForm';
import { makeStyles } from '@material-ui/core/styles';


const LoginPage = ({ setAuth, customStyles }) => {
  const cc = useStyles();
  return (
    <div className={cc.loginFormPageContainer}>
      <div className={cc.loginTextContainer}>Log In</div>
      <LoginForm setAuth={setAuth} customStyles={customStyles} />
    </div>
  );
};

// TODO: style the login wrapper
const useStyles = makeStyles({
  loginFormPageContainer: {
    maxWidth: 300,
    // border: '1px solid black',
    padding: 20
  },
  loginTextContainer: {
    padding: '20px 0px 20px 5px',
    textAlign: 'center'
  }
});
export default LoginPage;
