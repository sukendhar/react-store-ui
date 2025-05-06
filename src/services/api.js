import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // Need to change for prod
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authApi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

const attachToken = config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}

api.interceptors.request.use(attachToken)
authApi.interceptors.request.use(attachToken)

export default api
