import { useRouter } from "next/navigation"
import { GetBodyModels, GetBrands, GetCompanyModels, GetStreets, GetCategories, GetCars} from "../apiservice"
import { useDispatch } from "react-redux"
import { setBodyModels, setBrands, setCarsData, setCategories, setModels, setStreets } from "@/app/(storage)/reducers/listsReducer"

export class DataFetcher {
    
    private router = useRouter()
    private dispatch = useDispatch()

    public async getCarsData(){
        const carsfromDB = await GetCars().then(res => res.data)
        this.dispatch(setCarsData(carsfromDB))
        this.router.refresh();
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
}