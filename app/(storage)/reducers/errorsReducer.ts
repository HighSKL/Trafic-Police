import { createSlice } from "@reduxjs/toolkit";

type initialStateType = typeof initialState

const initialState = {
    AddCarPage: [],
    AddPeoplePage: [],
    AddTechInspectionPage: []
}

const reducer = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setAddCarErrors: (state, action) => { state.AddCarPage = action.payload },
        setAddPeopleErrors: (state, action) => { state.AddPeoplePage = action.payload },
        setAddTechInspectionErrors: (state, action) => { state.AddTechInspectionPage = action.payload }
    }
})

export const { setAddCarErrors, setAddPeopleErrors, setAddTechInspectionErrors } = reducer.actions

export const errorsReducer = reducer.reducer

