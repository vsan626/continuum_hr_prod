import * as React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [loginView, setLoginView] = React.useState(false);

  const viewLogin = () => {
    setLoginView(!loginView);
  };
  return (
    // TODO: check if auth token exists, if so load employee list / other form
    <div className="App">
      {loginView ? <LoginPage /> : <RegisterPage />}
      <div onClick={viewLogin}>
        {loginView
          ? 'Need to register? Click here'
          : 'Already registered? Click here to Log in'}
      </div>
    </div>
  );
}

export default App;
