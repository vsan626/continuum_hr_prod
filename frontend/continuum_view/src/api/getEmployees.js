import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const getEmployees = async () => {
  const token = localStorage.getItem('auth');

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  try {
    const data = await axios.get('/api/user/employees');

    return data.data.employees;
  } catch (err) {
    throw err.response;
  }
};

export { getEmployees };
