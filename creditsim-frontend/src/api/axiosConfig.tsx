import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/"
});

api.interceptors.request.use(
    (config) => {
        config.headers = config.headers ?? {};
        return config
    },
    (error) => Promise.reject(error)
);

export default api;