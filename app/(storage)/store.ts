import { combineReducers, createStore } from "redux";
import carsReducers from "./(reducers)/carsReducer";


type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>
let reducers = combineReducers({
    carsReducer: carsReducers
})

export const store = createStore(reducers);

//@ts-ignore
window.store = store.getState();
