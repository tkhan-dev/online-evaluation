import axios from 'axios';

const domain = process.env.REACT_APP_BASE_URL;

const request = axios.create({
  baseURL: `${domain}/`,
  transformResponse: [
    response => {
      if (response) {
        const parsed = JSON.parse(response);
        return {
          data: parsed.data,
          success: parsed.success,
          message: parsed.message,
        };
      }
      return null;
    },
  ],
});

export default request;
