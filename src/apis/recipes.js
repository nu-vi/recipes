import axios from 'axios';

const dev = 'http://localhost:3003';

export default axios.create({
  baseURL: dev,
});
