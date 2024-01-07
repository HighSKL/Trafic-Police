import { useRouter } from "next/navigation"
import { GetBodyModels, GetBrands, GetCompanyModels, GetStreets, GetCategories, GetCars, GetPeopleOwnCars, GetPeople, GetCompany, GetInspecton, GetCompanyDriver, GetAccidents} from "../apiservice"
import { useDispatch } from "react-redux"
import { setBodyModels, setBrands, setCarsData, setCategories, setCompanyData, setDriverCompanyData, setInspectionData, setModels, setPeopleData, setStreets, setTraficAccidentDataSSSS } from "@/app/(storage)/reducers/listsReducer"
import { setPeopleOwnCars } from "@/app/(storage)/reducers/userDataReducer"

export class DataFetcher {
    
    private router = useRouter()
    private dispatch = useDispatch()

    public async getCarsData(){
        const carsfromDB = await GetCars().then(res => res.data)
        this.dispatch(setCarsData(carsfromDB))
    }

    public async getBodyModels(){
        const bodyModels = await GetBodyModels().then(res=>res.data)
        this.dispatch(setBodyModels(bodyModels))
        this.router.refresh()
    }

    public async getModels(brandName:string) {
        const models = await GetCompanyModels(brandName).then(res=>res.data)
        this.dispatch(setModels(models))
        this.router.refresh()
    }

    public async getBrands(){
        const brands = await GetBrands().then(res=>res.data)
        this.dispatch(setBrands(brands))
        this.getModels(brands[0].name)
    }

    public async getStreets(){
        const streets = await GetStreets().then(res=>res.data)
        this.dispatch(setStreets(streets))
        this.router.refresh()
    }

    public async getCategories(){
        const categories = await GetCategories().then(res=>res.data)
        this.dispatch(setCategories(categories))
        this.router.refresh()
    }

    public async GetOwnCars(userId:number){
        const cars = await GetPeopleOwnCars(userId).then(res=>res.data)
        this.dispatch(setPeopleOwnCars(cars))
    }

    public async GetPeople(){
        const people = await GetPeople().then(res=>res.data)
        this.dispatch(setPeopleData(people))
    }

    public async GetCompany(){
        const company = await GetCompany().then(res=>res.data)
        this.dispatch(setCompanyData(company))
    }

    public async GetInspection(){
        const inspection = await GetInspecton().then(res=>res.data)
        this.dispatch(setInspectionData(inspection))
    }
    public async GetCompanyDriver(){
        const data = await GetCompanyDriver().then(res=>res.data)
        this.dispatch(setDriverCompanyData(data))
    }

    public async GetTraficAccidents(){
        const data = await GetAccidents().then(res=>res.data)
        this.dispatch(setTraficAccidentDataSSSS(data))
    }
    
}