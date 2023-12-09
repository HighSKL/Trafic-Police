const get = async (path: string) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, { cache: 'no-store' }).then(res=>res.json()))
const post = async (path: string, data: Object) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, {method: "POST", body: JSON.stringify(data)}).then(res=>res.json()))

//GET
export const GetCars = () => get('car/getcars')
export const GetBrands = () => get('car/getbrands')
export const GetBodyModels = () => get('car/getbodymodels')
//POST
export const RegCar = async (StateNumber:string, RegionNumber: number, Mark: string, CarModel: string, 
    BodyNumber: number, ChassisNumber: number,EngineNumber: number, BodyModel: string,Color: string,
    EngineCapacity: number, EnginePower: number, WheelLocation: string, WheelDrive: string,YearManufactured: string,
    DateRegistration: string, InspectionTicketId: number, DateTicketGived: number, CarTaxPerYear: number) => post('car/add',
    {
        StateNumber: StateNumber, RegionNumber:RegionNumber, Mark:Mark, 
        CarModel:CarModel, BodyNumber:BodyNumber, ChassisNumber:ChassisNumber, EngineNumber:EngineNumber,
        BodyModel:BodyModel,Color:Color, EngineCapacity:EngineCapacity, EnginePower:EnginePower,
        WheelLocation:WheelLocation, WheelDrive:WheelDrive, YearManufactured:YearManufactured,
        DateRegistration:DateRegistration, InspectionTicketId:InspectionTicketId, DateTicketGived:DateTicketGived,
        CarTaxPerYear:CarTaxPerYear
    }
)
export const GetCompanyModels = (brandName:string) => post('car/getcompanymodels', {brandName: brandName})
export const GetCurrentCar = async (query:string) => post('car/getcars', {query: query})
export const AddPeoplePhys = async (CarsOwn: Array<number>, Email: string, OwnerName: string, Ownerphonenumber: string, 
    PassportSeries: number, PassportNumber: number, WhoPassportGived: string,
    DatePassportGived: string,  DriverlicenseNumber: number, DriverlicenseGivedData: string, Categories: string) => post('people/add/physical',
    {
        CarsOwn: CarsOwn, Email: Email, OwnerName: OwnerName, Ownerphonenumber: Ownerphonenumber, 
        PassportSeries: PassportSeries, PassportNumber: PassportNumber, WhoPassportGived: WhoPassportGived,
        DatePassportGived: DatePassportGived,  DriverlicenseNumber: DriverlicenseNumber, 
        DriverlicenseGivedData: DriverlicenseGivedData, Categories: Categories
    }
)
export const AddPeopleJur=async(CarsOwn: Array<number>, Organization_address: string, Organization_name: string,
    DirectorName: string, Directorphonenumber: string) => post('people/add/juridical',
    {
        CarsOwn: CarsOwn, Organization_address: Organization_address, Organization_name: Organization_name, 
        DirectorName: DirectorName, Directorphonenumber: Directorphonenumber
    }
)
//

// export const RegCar = async (StateNumber:string, RegionNumber: number, Mark: string, CarModel: string, 
//     BodyNumber: number, ChassisNumber: number,EngineNumber: number, BodyModel: string,Color: string,
//     EngineCapacity: number, EnginePower: number, WheelLocation: string, WheelDrive: string,YearManufactured: string,
//     DateRegistration: string, InspectionTicketId: number, DateTicketGived: number, CarTaxPerYear: number) => (
//     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/add`,{
//         method: "POST",
//         body: JSON.stringify({StateNumber: StateNumber, RegionNumber:RegionNumber, Mark:Mark, CarModel:CarModel, BodyNumber:BodyNumber, ChassisNumber:ChassisNumber,
//             EngineNumber:EngineNumber, BodyModel:BodyModel,Color:Color, EngineCapacity:EngineCapacity, EnginePower:EnginePower, WheelLocation:WheelLocation, WheelDrive:WheelDrive,
//             YearManufactured:YearManufactured, DateRegistration:DateRegistration, InspectionTicketId:InspectionTicketId, DateTicketGived:DateTicketGived, CarTaxPerYear:CarTaxPerYear})
//     }).then(res=>res.json()))

// export const GetCars = async () => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/getcars`, { cache: 'no-store' }).then(res=>res.json()))
// export const GetBrands = async () => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/getbrands`, { cache: 'no-store' }).then(res=>res.json()) )
// export const GetCurrentCar = async (query: string) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/getcars`, {
//     method: "POST",
//     body: JSON.stringify({query: query})
// }).then(res=>res.json()))

// export const AddPeoplePhys = async (CarsOwn: Array<number>, Email: string, OwnerName: string, Ownerphonenumber: string, 
//                                     PassportSeries: number, PassportNumber: number, WhoPassportGived: string,
//                                     DatePassportGived: string,  DriverlicenseNumber: number, DriverlicenseGivedData: string, Categories: string) => 
//     (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/people/add/physical`,{
//         method: "POST",
//         body: JSON.stringify({
//             CarsOwn: CarsOwn, Email: Email, OwnerName: OwnerName, Ownerphonenumber: Ownerphonenumber, 
//             PassportSeries: PassportSeries, PassportNumber: PassportNumber, WhoPassportGived: WhoPassportGived,
//             DatePassportGived: DatePassportGived,  DriverlicenseNumber: DriverlicenseNumber, 
//             DriverlicenseGivedData: DriverlicenseGivedData, Categories: Categories
//         })
//     }).then(res=>res.json())
// )

// export const AddPeopleJur=async(CarsOwn: Array<number>, Organization_address: string, Organization_name: string,
//                                 DirectorName: string, Directorphonenumber: string) => 
//     (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/people/add/juridical`,{
//         method: "POST",
//         body: JSON.stringify({
//             CarsOwn: CarsOwn, Organization_address: Organization_address, Organization_name: Organization_name, 
//             DirectorName: DirectorName, Directorphonenumber: Directorphonenumber
//         })
//     }).then(res=>res.json())
// )

