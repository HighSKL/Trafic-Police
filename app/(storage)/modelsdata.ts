export let Models:Array<string>|null = ['TT', 'Q6', 'Q8']//null
export let setModels = (models:Array<string>) => {Models = models.map((elem:any)=>{
    return elem.name
})}