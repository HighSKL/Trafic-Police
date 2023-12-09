import { useRouter } from "next/navigation"
import { setBodyModels } from "../(storage)/bodymodelsdata"
import { GetBodyModels } from "./apiservice"

export class DataFetcher {
    private router = useRouter()

    public async getBodyModels(){
        const bodyModels = await GetBodyModels().then(res=>res.data)
        setBodyModels(bodyModels)
        this.router.refresh()
    }
}