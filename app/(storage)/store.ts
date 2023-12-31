'use client'
import { configureStore } from "@reduxjs/toolkit";
import { listsReducer } from "./reducers/listsReducer";
import { errorsReducer } from "./reducers/errorsReducer";
import { loginReducer } from "./reducers/loginReducer";
import { userDataReducer } from "./reducers/userDataReducer";
import { showDataReducer } from "./reducers/showDataReducer";

export const store = configureStore({
    reducer: {
        errors: errorsReducer,
        lists: listsReducer,
        login: loginReducer,
        userData: userDataReducer,
        showData: showDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
// window.store = store.getState()