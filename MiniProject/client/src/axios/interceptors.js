import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
      'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    console.log('request sent')
    return config
}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
    console.log('got response');
    return response
}, (error) => {
    console.log(error);
})

export default instance