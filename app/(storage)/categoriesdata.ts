export let Categories: string[]|null = ['A', 'B', 'C']//null
export let setCategories = (categories:string[]) => {
    Categories = categories.map((elem:any)=>{
        return elem.name
    })
}