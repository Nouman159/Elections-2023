import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your API base URL
    withCredentials: true, // Set withCredentials to true to send cookies with cross-origin requests
});

export default axiosInstance;