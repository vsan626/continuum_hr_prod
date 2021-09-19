import * as React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { makeStyles } from '@material-ui/core/styles';

const RegisterPage = () => {
  const cc = useStyles();
  return (
    <div className={cc.registerFormPageContainer}>
      <div className={cc.registerTextContainer}>Create an account</div>
      <RegisterForm />
    </div>
  );
};

const useStyles = makeStyles({
  registerFormPageContainer: {
    maxWidth: 300,
    // border: '1px solid black',
    padding: 20
  },
  registerTextContainer: {
    padding: '20px 0px 20px 5px',
    textAlign: 'center'
  }
});

export default RegisterPage;
