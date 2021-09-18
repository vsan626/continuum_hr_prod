import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const logIn = async (userCredentials) => {
  console.log(process.env.REACT_APP_API_URL);
  const { username, password } = userCredentials;

  const data = await axios.post('/api/auth/login', { username, password });
  console.log(data);
};

export { logIn };
