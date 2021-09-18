import axios from 'axios';
import { saveToken } from '../utils/localStorage';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const logIn = async (userCredentials) => {
  const { loginUsername, loginPassword } = userCredentials;
  try {
    const { data } = await axios.post('/api/auth/login', {
      username: loginUsername,
      password: loginPassword
    });

    saveToken(data.token);
  } catch (err) {
    throw err.response;
  }
};

export { logIn };
