import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
api.interceptors.request.use(
    (config) => {
        config.headers = config.headers ?? {};
        return config
    },
    (error) => Promise.reject(error)
);

export default api;