import * as React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import { getToken } from '../utils/localStorage';
import {
  MuiThemeProvider,
  createTheme,
  makeStyles
} from '@material-ui/core/styles';

function App() {
  const [loginView, setLoginView] = React.useState(false);
  const [auth, setAuth] = React.useState(() => {
    return getToken();
  });

  const viewLogin = () => {
    setLoginView(!loginView);
  };

  const cc = useStyles();

  // NOTE: Better way to do this authentication check, but for now this will do
  return auth !== 'null' ? (
    <MuiThemeProvider theme={THEME}>
      <div className={cc.mainPageContainer}>
        <MainPage />
      </div>
    </MuiThemeProvider>
  ) : (
    <div className="App">
      <div className={cc.container}>
        <div className={cc.formContentContainer}>
          {loginView ? (
            <LoginPage setAuth={setAuth} customStyles={cc} />
          ) : (
            <RegisterPage />
          )}
          <div
            className={cc.formSelectContainer}
            onClick={viewLogin}
            style={{ cursor: 'pointer' }}
          >
            {loginView
              ? 'Need to register? Click here'
              : 'Already registered? Click here to Log in'}
          </div>
        </div>
      </div>
    </div>
  );
}

const THEME = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 375,
    height: '100vh',
    backgroundColor: 'rgba(209, 214, 209, 0.87)'
  },
  mainPageContainer: {
    backgroundColor: 'rgba(209, 214, 209, 0.87)',
    minWidth: 375,
    height: '100%',
  },
  formContentContainer: {
    background: 'rgb(255, 255, 255)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    border: '1px solid black'
  },
  formSelectContainer: {
    padding: 15
  }
});

export default App;
