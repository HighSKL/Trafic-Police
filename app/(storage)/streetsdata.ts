export let Streets:Array<string>|null = ['----', 'Тюленина', 'Геодезическая', 'Авиастроителей']//null
export let setStreets = (streets:Array<string>) => {
    Streets = streets.map((elem:any)=>{
        return elem.name
    })
    Streets.unshift('---')
}