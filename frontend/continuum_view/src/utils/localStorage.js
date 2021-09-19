/**
 * used for logging in
 * @param Bearer token
 */
export const saveToken = (token) => {
  try {
    localStorage.setItem('auth', token);
  } catch (err) {
    throw err;
  }
};

/**
 * used for logging out
 */
export const destroyToken = () => {
  try {
    localStorage.removeItem('auth');
  } catch (err) {
    throw err;
  }
};

/**
 * get auth token
 */
export const getToken = () => {
  const token = localStorage.getItem('auth');
  console.log('token', token);
  const parsedToken = JSON.stringify(token);
  console.log({ parsedToken });
  return parsedToken;
};
