import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AddCarPage: [],
    AddPeoplePage: [],
    AddTechInspectionPage: [],
    AddAccident: [],
    Login: []
}

const reducer = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setAddCarErrors: (state, action) => { state.AddCarPage = action.payload },
        setAddPeopleErrors: (state, action) => { state.AddPeoplePage = action.payload },
        setAddTechInspectionErrors: (state, action) => { state.AddTechInspectionPage = action.payload },
        setAddAccidentErrors: (state, action) => { state.AddAccident = action.payload },
        setLoginErrors: (state, action) => {state.Login = action.payload}
    }
})

export const { 
    setAddCarErrors, setAddPeopleErrors, setAddTechInspectionErrors, setAddAccidentErrors, setLoginErrors
} = reducer.actions

export const errorsReducer = reducer.reducer

