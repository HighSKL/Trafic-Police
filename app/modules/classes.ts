import { useRouter } from "next/navigation"
import { setBodyModels } from "../(storage)/bodymodelsdata"
import { GetBodyModels, GetBrands, GetCompanyModels } from "./apiservice"
import { setModels } from "../(storage)/modelsdata"
import { setBrands } from "../(storage)/brandsdata"

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
        console.log(brands)
        setBrands(brands)
        this.getModels(brands[0].name)
    }
}