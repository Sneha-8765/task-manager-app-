import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-manager-app-backend-9h41yai18.vercel.app',
  //params: { password: 'your_vercel_password' }, // Replace with your password
});

export default api;