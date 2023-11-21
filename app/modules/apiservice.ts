export const RegCar = async (StateNumber:string, RegionNumber: number, Mark: string, CarModel: string, 
    BodyNumber: number, ChassisNumber: number,EngineNumber: number, BodyModel: string,Color: string,
    EngineCapacity: number, EnginePower: number, WheelLocation: string, WheelDrive: string,YearManufactured: string,
    DateRegistration: string, InspectionTicketId: number, DateTicketGived: number, CarTaxPerYear: number) => (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/add`,{
        method: "POST",
        body: JSON.stringify({StateNumber: StateNumber, RegionNumber:RegionNumber, Mark:Mark, CarModel:CarModel, BodyNumber:BodyNumber, ChassisNumber:ChassisNumber,
            EngineNumber:EngineNumber, BodyModel:BodyModel,Color:Color, EngineCapacity:EngineCapacity, EnginePower:EnginePower, WheelLocation:WheelLocation, WheelDrive:WheelDrive,
            YearManufactured:YearManufactured, DateRegistration:DateRegistration, InspectionTicketId:InspectionTicketId, DateTicketGived:DateTicketGived, CarTaxPerYear:CarTaxPerYear})
    }).then(res=>res.json()))

export const GetCars = async () => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/getcars`, { cache: 'no-store' }).then(res=>res.json()))
export const GetCurrentCar = async (query: string) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/getcars`, {
    method: "POST",
    body: JSON.stringify({query: query})
}).then(res=>res.json()))