export const RegCar = async (StateNumber:string, RegionNumber: number, Mark: string, CarModel: string, BodyNumber: number, ChassisNumber: number,
EngineNumber: number, BodyModel: string,Color: string, EngineCapacity: number, EnginePower: number, WheelLocation: string, WheelDrive: string,
YearManufactured: string, DateRegistration: string, InspectionTicketId: number, DateTicketGived: number, CarTaxPerYear: number) => {
    console.log(JSON.stringify({StateNumber, RegionNumber, Mark, CarModel, BodyNumber, ChassisNumber,
        EngineNumber, BodyModel,Color, EngineCapacity, EnginePower, WheelLocation, WheelDrive,
        YearManufactured, DateRegistration, InspectionTicketId, DateTicketGived, CarTaxPerYear}))
    // return fetch('',{
    //     method: "POST",
    //     body: JSON.stringify({StateNumber, RegionNumber, Mark, CarModel, BodyNumber, ChassisNumber,
    //         EngineNumber, BodyModel,Color, EngineCapacity, EnginePower, WheelLocation, WheelDrive,
    //         YearManufactured, DateRegistration, InspectionTicketId, DateTicketGived, CarTaxPerYear})
    // }).then(respones=>respones.json())
}