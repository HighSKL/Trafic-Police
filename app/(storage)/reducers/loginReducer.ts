import { UserDataType } from "@/app/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null as UserDataType|null
}

const reducer = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUserData: (state, action) => {state.user = action.payload}
    }
})

export const { setUserData } = reducer.actions

export const loginReducer = reducer.reducer

