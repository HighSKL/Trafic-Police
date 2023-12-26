import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AccidentPage: {
        peopleOwnCars: ['---'] as string[]
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

    }
})

export const { setPeopleOwnCars } = reducer.actions

export const userDataReducer = reducer.reducer