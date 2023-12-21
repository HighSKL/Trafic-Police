import { useRouter } from "next/navigation"
import { setBodyModels } from "../../(storage)/bodymodelsdata"
import { GetBodyModels, GetBrands, GetCompanyModels, GetStreets, GetCategories} from "../apiservice"
import { setModels } from "../../(storage)/modelsdata"
import { setBrands } from "../../(storage)/brandsdata"
import { setStreets } from "@/app/(storage)/streetsdata"
import { setCategories } from "@/app/(storage)/categoriesdata"

export class DataFetcher {
    private router = useRouter()

    public async getBodyModels(){
        const bodyModels = await GetBodyModels().then(res=>res.data)
        setBodyModels(bodyModels)
        this.router.refresh()
    }

    public async getModels(brandName:string) {
        const models = await GetCompanyModels(brandName).then(res=>res.data)
        setModels(models)
        this.router.refresh()
    }

    public async getBrands(){
        const brands = await GetBrands().then(res=>res.data)
        setBrands(brands)
        this.getModels(brands[0].name)
    }

    public async getStreets(){
        const streets = await GetStreets().then(res=>res.data)
        setStreets(streets)
        this.router.refresh()
    }

    public async getCategories(){
        const categories = await GetCategories().then(res=>res.data)
        setCategories(categories)
        this.router.refresh()
    }
}