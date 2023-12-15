export let Models:Array<string>|null = ['---']//null
export let setModels = (models:Array<string>) => {
    Models = models.map((elem:any)=>{
        return elem.name
    })
    Models.unshift('---')
}