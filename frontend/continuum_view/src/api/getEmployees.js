import axios from 'axios';
import { getToken } from '../utils/localStorage';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const getEmployees = async () => {
  const token = localStorage.getItem('auth');

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  try {
    const data = await axios.get('/api/user/employees');
    console.log('data from get api', data.data.employees);

    return data.data.employees;
  } catch (err) {
    console.log('err from register api', err);
    throw err.response;
  }
};

export { getEmployees };
