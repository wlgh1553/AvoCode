import axios from 'axios';

const URL = process.env.COMPILE_SERVER_URL;

const headers = {
  'content-type': 'application/json',
  'Content-Type': 'application/json',
};

const querystring = {
  base64_encoded: 'true',
  wait: 'true',
  fields: '*',
};

const compileAxiosInstance = axios.create({
  baseURL: URL,
  headers: headers,
  params: { querystring: querystring },
});

export default compileAxiosInstance;
