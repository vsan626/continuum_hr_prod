import * as React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import { getToken } from '../utils/localStorage';
import { getEmployees } from '../api/getEmployees';

function App() {
  const [loginView, setLoginView] = React.useState(false);
  const [auth, setAuth] = React.useState(() => {
    return getToken();
  });

  console.log({ auth });
  const viewLogin = () => {
    setLoginView(!loginView);
  };

  // NOTE: Better way to do this authentication check, but for now this will do
  // TODO: check if auth token exists, if so load employee list / other form.
  // TODO: This needs to happen when user logs in successfully
  return auth !== 'null' ? (
    <MainPage />
  ) : (
    <div className="App">
      {loginView ? <LoginPage setAuth={setAuth} /> : <RegisterPage />}
      <div onClick={viewLogin} style={{ cursor: 'pointer' }}>
        {loginView
          ? 'Need to register? Click here'
          : 'Already registered? Click here to Log in'}
      </div>
    </div>
  );
}

export default App;
