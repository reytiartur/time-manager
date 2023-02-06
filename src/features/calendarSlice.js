import { createSlice } from "@reduxjs/toolkit";

const selectedDate = new Date();
const activeDate = new Date();

export const calendarReducer = createSlice({
    name: 'calendar',
    initialState: { selectedDate, activeDate},
    reducers: {
        setBothDates: (state, action) => {
            return {selectedDate: action.payload, activeDate: action.payload}
        },
        setActiveDate: (state, action) => {
            return { ...state, activeDate: action.payload}
        },
        setSelectedDate: (state, action) => {
            return { ...state, selectedDate: action.payload}
        }, 
    }
})

export const { setBothDates, setActiveDate, setSelectedDate } = calendarReducer.actions;
export default calendarReducer.reducer;