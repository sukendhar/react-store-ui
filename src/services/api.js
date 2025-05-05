import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // Need to change for prod
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;