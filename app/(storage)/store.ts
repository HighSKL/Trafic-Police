'use client'
import { configureStore } from "@reduxjs/toolkit";
import { listsReducer } from "./reducers/listsReducer";
import { errorsReducer } from "./reducers/errorsReducer";

export const store = configureStore({
    reducer: {
        errors: errorsReducer,
        lists: listsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch