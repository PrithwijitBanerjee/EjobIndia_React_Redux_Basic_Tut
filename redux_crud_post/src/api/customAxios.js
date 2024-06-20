import axios from "axios";


// custom axios ...
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
});