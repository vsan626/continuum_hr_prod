import * as React from 'react';
import LoginForm from '../../components/LoginForm';

const LoginPage = ({setAuth}) => {
  return (
    <>
      <div>Log In</div>
      <LoginForm setAuth={setAuth}/>
    </>
  );
};

export default LoginPage;
