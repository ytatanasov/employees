import { URL_BASE } from './constants';

const request = async (endpoint, options) => {
  try {
    const response = await fetch(`${URL_BASE}/${endpoint}`, options);
    return await response.json();
  } catch (error) {
    // Handle global error
  }
};

export default request;
