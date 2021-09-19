import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const register = async (userCredentials) => {
  const { registerUsername, registerPassword } = userCredentials;

  try {
    const data = await axios.post('/api/auth/register', {
      username: registerUsername,
      password: registerPassword
    });

    return data.status;
  } catch (err) {
    throw err.response;
  }
};

export { register };
