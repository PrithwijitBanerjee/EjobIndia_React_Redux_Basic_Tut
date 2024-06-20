import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils/statusObj";
import { axiosInstance } from "../../api/customAxios";
import { toast } from "react-toastify";


const initialState = {
    students: [],
    status: STATUSES.IDLE,
    student: {},
    err: null
}

export const addStudent = async studentData => {
    try {
        const { data } = await axiosInstance.post('student', studentData);
        return data;
    } catch (error) {
        throw new Error(`Error while using addStudent API: ${error?.message}`);
    }
}

export const editStudent = async (id, updatedData) => {
    try {
        const { data } = await axiosInstance.post(`update/${id}`, updatedData);
        return data;
    } catch (error) {
        throw new Error(`Error in editStudent API: ${error?.message}`);
    }
}

export const deleteStudent = async id => {
    try {
        const { data } = await axiosInstance.delete(`delete/${id}`);
        toast.error(data?.msg, {
            theme: 'colored'
        });
    } catch (error) {
        console.log(`Error while calling deleteStudent API: ${error?.message}`);
    }
}

// thunk middleware ...

export const fetchStudents = createAsyncThunk("students/fetch", async () => {
    try {
        const { data } = await axiosInstance.get("allStudent");
        return data;
    } catch (error) {
        toast.error("something went wrong!!!", {
            theme: 'colored'
        });
        console.log(error);
    }
});

export const fetchSingleStudent = createAsyncThunk('student/fetch', async id => {
    try {
        const { data } = await axiosInstance(`edit/${id}`);
        return data;
    } catch (error) {
        throw new Error(`failed to fetch single student details: ${error?.message}`);
    }
});

const studentSlice = createSlice({
    name: 'fetch/allStudents',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchStudents.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(fetchStudents.fulfilled, (state, { payload }) => {
                if (payload?.ststus === 'success') {
                    state.status = STATUSES.IDLE;
                    state.students = payload.data;
                }
            })
            .addCase(fetchStudents.rejected, (state, { error }) => {
                state.status = STATUSES.REJECTED;
                state.err = error;
            })
            .addCase(fetchSingleStudent.pending, state => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchSingleStudent.fulfilled, (state, { payload }) => {
                state.status = STATUSES.IDLE;
                state.student = payload;
            })
            .addCase(fetchSingleStudent.rejected, (state, { error }) => {
                state.status = STATUSES.REJECTED;
                state.err = error;
            })
    }
});

export default studentSlice.reducer;