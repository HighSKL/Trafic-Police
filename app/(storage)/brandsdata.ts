export let Brands:Array<string>|null = ['Audi', 'Mitsubishi', 'Toyota']//null
export let setBrands = (brands:Array<string>) => {Brands = brands.map((elem:any)=>{
    return elem.name
})}