import { createSlice } from "@reduxjs/toolkit";

const projects = [
    // {
    //     projectName: 'Time Tracker',
    //     projectNumber: 112113,
    //     client: 'PetersonApp',
    //     managers: ['Katelin Kanyuk'],
    //     projectType: 'Full-Stack App Development',
    //     timebank: 850,
    //     hoursSpent: 130,
    //     period: '22/10/2022 - 22/02/2023',
    //     pricePerHour: {
    //         PM: '10.5',
    //         Frontend: '12.5',
    //     },
    //     submittedHours: {

    //     },
    //     peopleAssigned: [],
    //     archived: false,
    // }
]

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