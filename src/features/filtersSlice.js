import { createSlice } from "@reduxjs/toolkit";

export const filtersReducer = createSlice({
    name: 'filters',
    initialState: {
        filter: null,
        search: null,
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    }
})

export const { setFilter, setSearch } = filtersReducer.actions;
export default filtersReducer.reducer;