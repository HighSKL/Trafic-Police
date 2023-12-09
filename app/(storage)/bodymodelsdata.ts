export let BodyModels:Array<string>|null = ['Седан', 'Универсал'] //null
export let setBodyModels = (bodyModels:Array<string>) => {BodyModels = bodyModels.map((elem:any)=>{
    return elem.name
})}