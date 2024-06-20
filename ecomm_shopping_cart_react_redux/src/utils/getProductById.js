import { axiosInstance } from "../api/axiosInstance";


export const getProductById = async  idsArr => {
    return Promise.all(idsArr.map(async id => {
        try {
            const { data } = await axiosInstance(`products/${id}`);
            return data;
        } catch (error) {
            return error?.message;
        }
    }));
}