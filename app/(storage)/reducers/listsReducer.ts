import { Car } from "@/app/types/types"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    Brands: ['---', 'Audi', 'Mitsubishi', 'Toyota'] as string[]|null,
    BodyModels: ['---','Седан', 'Универсал'] as string[]|null,
    CarsData: null as Car[]|null,
    Categories: ['A', 'B', 'C'] as string[]|null,
    Models: ['---'] as string[]|null,
    Streets: ['---', 'Тюленина', 'Геодезическая', 'Авиастроителей'] as string[]|null
}

const reducer = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        setBodyModels: (state, action) => {
            state.BodyModels = action.payload.map((elem:any)=>{
                return elem.name
            })
            state.BodyModels?.unshift('---')
        },
        setBrands: (state, action) => {
            state.Brands = action.payload.map((elem:any)=>{
                return elem.name
            })
            state.Brands?.unshift('---')
        },
        setCarsData: (state, action) => {state.CarsData = action.payload},
        setCategories: (state, action) => {
            state.Categories = action.payload.map((elem:any)=>{
                return elem.name
            })
        },
        setModels: (state, action) => {
            state.Models = action.payload.map((elem:any)=>{
                return elem.name
            })
            state.Models?.unshift('---')
        },
        setStreets: (state, action) => {
            state.Streets = action.payload.map((elem:any)=>{
                return elem.name
            })
            state.Streets?.unshift('---')
        }
    }
})

export const { setBodyModels, setBrands, setCarsData, setCategories, setModels, setStreets } = reducer.actions

export const listsReducer = reducer.reducer