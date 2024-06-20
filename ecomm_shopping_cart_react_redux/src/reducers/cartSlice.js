import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductById } from "../utils/getProductById";
import { STATUSES } from "../utils/statusObj";
import { toast } from "react-toastify";

const idsArr = JSON.parse(localStorage.getItem('cartIds'));
const initialState = {
    cartIds: idsArr && idsArr?.length !== 0 ? idsArr : [],
    status: STATUSES.IDLE,
    cartProducts: [],
    errMsg: ''
};


// thunk middleware ...
export const fetchAllCartProducts = createAsyncThunk(
    'products/ecomm/cartAsync',
    async productIdsArr => {
        try {
            const res = await getProductById(productIdsArr);
            return res;
        } catch (error) {
            throw new Error(error?.message);
        }
    }
)

// slice ...

const cartSlice = createSlice({
    name: 'ecomm/products/cart',
    initialState,
    reducers: {
        add_to_cart: (state, { payload }) => {
            if (!state.cartIds.includes(payload)) {
                state.cartIds.push(payload);
                localStorage.setItem('cartIds', JSON.stringify(state.cartIds)); // persisted data ...
                toast.success(`${state.cartIds?.length} added to cart!!!`, {
                    theme: 'colored',
                });
            }
        },
        remove_cart: (state, { payload }) => {
            state.cartIds = state.cartIds.filter(item => item !== payload);
            const removedItem = state.cartProducts.find(item => item?.id === payload);
            state.cartProducts = state.cartProducts.filter(item => item?.id !== payload);
            localStorage.setItem('cartIds', JSON.stringify(state.cartIds)); // persisted data ...
            toast.error(`${removedItem?.title?.slice(0, 20)} has been removed from cart!!!`, {
                theme: 'colored',
            });
        },
        empty_cart: state => { // for cleanUp purposes ...
            state.cartProducts = [];
            state.status = STATUSES.IDLE;
            state.errMsg = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAllCartProducts.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(fetchAllCartProducts.fulfilled, (state, { payload }) => {
                state.status = STATUSES.IDLE;
                state.cartProducts = payload;
            })
            .addCase(fetchAllCartProducts.rejected, (state, { error }) => {
                state.status = STATUSES.REJECTED;
                state.errMsg = error;
            })
    }
});

export const { add_to_cart, remove_cart, empty_cart } = cartSlice.actions;

export default cartSlice.reducer;