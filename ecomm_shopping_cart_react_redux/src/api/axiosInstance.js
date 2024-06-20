import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL
});

export const axiosAuthInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_AUTH_URL
});
