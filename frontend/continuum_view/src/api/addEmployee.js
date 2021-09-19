import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const addEmployee = async (userData) => {
  const { firstname, lastname, salary } = userData;

  try {
    const res = await axios.post('/api/user/newemployee', {
      firstname,
      lastname,
      salary
    });

    return res;
  } catch (err) {
    throw err.response;
  }
};

export { addEmployee };
