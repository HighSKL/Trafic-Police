import { Car, CompanyType, DriverCompanyType, PeopleType, TraficAccidentDataType } from "@/app/types/types"
import { createSlice } from "@reduxjs/toolkit"
import { InpectionType } from '@/app/types/types'

const initialState = {
    Brands: ['---', 'Audi', 'Mitsubishi', 'Toyota'] as string[]|null,
    BodyModels: ['---','Седан', 'Универсал'] as string[]|null,
    CarsData: null as Car[]|null,
    PeopleData: null as PeopleType[]|null,
    CompanyData: null as CompanyType[]|null,
    InspectionData: null as InpectionType[]|null,
    CompanyDriverType: null as DriverCompanyType[]|null,
    TraficAccidentData: null as any|null,
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
        }, 
        setPeopleData: (state, action) => { state.PeopleData = action.payload },
        setCompanyData: (state, action) => { state.CompanyData = action.payload },
        setDriverCompanyData: (state, action) => { state.CompanyDriverType = action.payload },
        setInspectionData: (state, action) => { state.InspectionData = action.payload },
        setTraficAccidentDataSSSS: (state, action) => { state.TraficAccidentData = action.payload }
    }
})

export const { setBodyModels, setBrands, setCarsData, setCategories, setModels, setStreets,
setPeopleData, setCompanyData, setInspectionData,setDriverCompanyData, setTraficAccidentDataSSSS } = reducer.actions

export const listsReducer = reducer.reducer