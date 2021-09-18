import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const register = async (userCredentials) => {
  const { registerUsername, registerPassword } = userCredentials;
  console.log({ userCredentials });
  try {
    const data = await axios.post('/api/auth/register', {
      username: registerUsername,
      password: registerPassword
    });
    console.log('data from register api', data);

    return data.status;
  } catch (err) {
    console.log('err from register api', err);
    throw err.response;
  }
};

export { register };
