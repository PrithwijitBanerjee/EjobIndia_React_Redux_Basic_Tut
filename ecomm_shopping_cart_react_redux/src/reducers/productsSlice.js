import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../utils/statusObj";
import { axiosInstance } from "../api/axiosInstance";

const initialState = {
    products: [],
    status: STATUSES.IDLE,
    errMsg: ''
};

// thunk middleware ...

export const fetchProducts = createAsyncThunk(
    'ecomm/products',
    async () => {
        try {
            const { data } = await axiosInstance.get('products');
            return data;
        } catch (error) {
            throw new Error(error?.message);
        }
    }
);

// slices ...

const productsSlice = createSlice({
    name: 'products/ecomm',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state.status = STATUSES.IDLE;
                state.products = payload;
            })
            .addCase(fetchProducts.rejected, (state, { error }) => {
                state.status = STATUSES.REJECTED;
                state.errMsg = error;
            })
    }
});

export default productsSlice.reducer;