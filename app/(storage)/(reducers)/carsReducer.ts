import { Car } from "@/app/types/types"

const initialState = {
    cars: null as Array<Car>|Array<null>|null
}
export type CarsInitialStateType = typeof initialState
type ActionType = {
    type: any
    newCars: Array<Car>
}

enum ActionTypes {
    SET_CARS
}

export default function carsReducers(state:CarsInitialStateType = initialState, action: ActionType){
    switch(action.type){
        case ActionTypes.SET_CARS:{
            console.log('1')
            return {...state, cars: [...action.newCars]}
        }
        default: 
            return state
    }
}




export let setCars = (newCars:Array<Car>) => ({type: ActionTypes.SET_CARS, newCars})

