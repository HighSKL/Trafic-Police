import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chosenCarData: [] as any[],
    InspectorData: [] as any[],
    PeopleData: [] as any[],
    CompanyData: [] as any[],
}

const reducer = createSlice({
    name: "showData",
    initialState,
    reducers: {
        setChosenData: (state, action) => { state.chosenCarData = action.payload },
        setInspectionData: (state, action) => { state.InspectorData = action.payload },
        setPeopleData: (state, action) => { state.PeopleData = action.payload },
        setCompanyData: (state, action) => { state.CompanyData = action.payload }
    }
})

export const { setChosenData,setInspectionData,setPeopleData, setCompanyData } = reducer.actions

export const showDataReducer = reducer.reducer