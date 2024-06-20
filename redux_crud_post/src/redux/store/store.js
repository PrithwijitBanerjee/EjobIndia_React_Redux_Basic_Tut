import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginSlice";
import studentReducer from "../reducers/studentSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        allStudents: studentReducer
    }
});