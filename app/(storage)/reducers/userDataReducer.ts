import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AccidentPage: {
        peopleOwnCars: ['---'] as string[],
        candidatePeople: null as any|null
    }
}

const reducer = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setPeopleOwnCars: (state, action) => { 
            state.AccidentPage.peopleOwnCars = action.payload.map((element:{state_number: string, brand: string, models: string})=>
            (`${element.state_number} ${element.brand} ${element.models}`))
            state.AccidentPage.peopleOwnCars?.unshift('---')
        },
        setCandidatePeople: (state, action)=>{
            state.AccidentPage.candidatePeople = action.payload
        }

    }
})

export const { setPeopleOwnCars, setCandidatePeople } = reducer.actions

export const userDataReducer = reducer.reducer