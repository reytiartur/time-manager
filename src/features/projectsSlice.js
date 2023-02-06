import { createSlice } from "@reduxjs/toolkit";

const projects = []

export const projectsReducer = createSlice({
    name: 'projects',
    initialState: projects,
    reducers: {
        addProject: (state, action) => {
            state.push(action.payload);
        },
        handleEdit: (state, action) => {
            const newObj = action.payload;
            const index = state.findIndex(obj => obj.projectNumber === newObj.projectNumber)
            return [...state.slice(0, index), newObj, ...state.slice(index + 1)]
        }
    }
})

export const { addProject, handleEdit } = projectsReducer.actions;
export default projectsReducer.reducer;