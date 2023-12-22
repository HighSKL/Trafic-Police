'use client'
import { configureStore } from "@reduxjs/toolkit";
import { errorsReducer } from "./reducers/errorsReducer";

// const reducers = combineReducers({
//     errors: errorsReducer
// })

export const store = configureStore({
    reducer: {
        errors: errorsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch