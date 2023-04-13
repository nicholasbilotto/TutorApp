import axios from 'axios';

export default axios.create({
  baseURL: 'https://tutor-app.herokuapp.com/'
});
