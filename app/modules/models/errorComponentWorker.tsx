import { useRouter } from "next/navigation"

interface ElementType<GetElement> {
    name: string;
    errorMessage: string;
}

export class ErrorComponentWorker {

    private errorArr: string[]
    private setErrorArr: (newArr: string[])=>void
    private router = useRouter()
    

    constructor(arr: string[], setErrorArr: (newArr:string[])=>void){
        this.errorArr = arr
        this.setErrorArr = setErrorArr
        this.changeError = this.changeError.bind(this)
        this.renderErrors = this.renderErrors.bind(this)
    }

    

    public renderErrors<Element>(elem: ElementType<Element>){
        if(this.errorArr.includes(elem.name)){
            return <p className="error_message_text">{elem.errorMessage}</p>
        }
    }

    public changeError(errorName:string, removeError: boolean = false){
        if(!removeError){
            const newState = [...this.errorArr]
            if(!newState.includes(errorName))
                newState.push(errorName)
            this.setFieldsErrors(newState)
            this.setErrorArr(newState)
            this.router.refresh()
        }
        else{
            this.setFieldsErrors([...this.errorArr.filter(err=>err!==errorName)])
        }   
    }

    public getErrorArr(){ return this.errorArr}

    public setFieldsErrors(newArr: string[]){
        this.errorArr = [...newArr]
    }
}