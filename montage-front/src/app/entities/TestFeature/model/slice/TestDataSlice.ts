import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TestDataSchema } from "../types/TestDataSchema";
import { fetchTestData } from "../services/fetchTestData";


const initialState: TestDataSchema = {};

export const testDataSlice = createSlice({
    name: 'TESTFORM',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<TestDataSchema>) => {
            state.id = action.payload.id;
            state.userId = action.payload.userId;
            state.body = action.payload.body;
            state.title = action.payload.title;

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestData.pending, (state) => {

            })
            .addCase(fetchTestData.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.userId = action.payload.userId;
                state.body = action.payload.body;
                state.title = action.payload.title;
            })
            .addCase(fetchTestData.rejected, (state, action) => {

            });
    },

})

// Action creators are generated for each case reducer function
export const { actions: testDataActions } = testDataSlice;
export const { reducer: testDataReducer } = testDataSlice;