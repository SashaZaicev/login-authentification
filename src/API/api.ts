import axios from 'axios'

const defaultOptions = {
    withCredentials: false,
    baseURL: 'https://tager.dev.ozitag.com',
    headers: {
        Accept: 'application/json',
    }
};

export const axiosInstance = axios.create(defaultOptions);

const interceptorConfigCreator = () => (config: any) => {
    const token = localStorage.getItem('accessToken')
    if (Boolean(token)) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        delete config.headers.Authorization
    }
    return config
}

const interceptorsConfig = interceptorConfigCreator()
axiosInstance.interceptors.request.use(interceptorsConfig)
