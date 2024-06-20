import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [],
    item: null,
};



// slices ...

const todoSlice = createSlice({
    name: 'todo/app/project',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push({
                id: Date.now() + '-' + Math.floor(Math.random() * 10000),
                title: action?.payload?.title,
                desc: action?.payload?.desc
            });
            localStorage.setItem('todo', JSON.stringify(state.items));
        },
        editItem: (state, action) => {
            state.items = JSON.parse(localStorage.getItem('todo')).length !== 0 && JSON.parse(localStorage.getItem('todo'));
            const itemIndex = state.items.findIndex(item => item?.id === action?.payload?.id);
            if (itemIndex !== -1) {
                state.items[itemIndex].title = action?.payload?.title;
                state.items[itemIndex].desc = action?.payload?.desc;
                localStorage.setItem('todo', JSON.stringify(state.items));
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item?.id !== action?.payload);
            localStorage.setItem('todo', JSON.stringify(state?.items));
        },
        getItemById: (state, { payload }) => {
            const findItem = state.items?.find(item => item?.id === payload);
            if (findItem) {
                state.item = findItem;
            }
        }
    }

});

export const { addItem, editItem, removeItem, getItemById } = todoSlice.actions;
export default todoSlice.reducer;