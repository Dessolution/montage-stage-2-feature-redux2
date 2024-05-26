import { createAsyncThunk } from "@reduxjs/toolkit";
import { TestData } from "../types/TestDataSchema";
import axios from "axios";
import { testDataActions } from "../slice/TestDataSlice";

// interface getTestFormDataProps {
//     id: number,
//     title: string;
//     body: string,
//     userId: number
// }

export const fetchTestData = createAsyncThunk<TestData, undefined, { rejectValue: string }>(
    'orders/storetest',
    async (Data, thunkAPI) => {
        try {
            const response = await axios.get<TestData>('https://jsonplaceholder.typicode.com/posts/1', Data);

            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(testDataActions.setData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
