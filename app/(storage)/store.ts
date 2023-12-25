'use client'
import { configureStore } from "@reduxjs/toolkit";
import { listsReducer } from "./reducers/listsReducer";
import { errorsReducer } from "./reducers/errorsReducer";
import { loginReducer } from "./reducers/loginReducer";

export const store = configureStore({
    reducer: {
        errors: errorsReducer,
        lists: listsReducer,
        login: loginReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch