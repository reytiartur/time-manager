import { createSlice } from "@reduxjs/toolkit";

export const currentUserReducer = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        }
    }
})

export const {setUser} = currentUserReducer.actions;
export default currentUserReducer.reducer;