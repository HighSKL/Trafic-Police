const get = async (path: string) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, { cache: 'no-store' }).then(res=>res.json()))
const post = async (path: string, data: Object) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, {method: "POST", body: JSON.stringify(data)}).then(res=>res.json()))

//GET
export const GetCars = () => get('car/getcars')
export const GetBrands = () => get('car/getbrands')
export const GetBodyModels = () => get('car/getbodymodels')
export const GetStreets = () => get('streets')
//POST
export const RegCar = async (StateNumber:string, RegionNumber: number, CarModel: string, 
    BodyNumber: number, ChassisNumber: number,EngineNumber: number, BodyModel: string,Color: string,
    EngineCapacity: number, EnginePower: number, WheelLocation: string, WheelDrive: string,YearManufactured: string,
    DateRegistration: string, CarTaxPerYear: number) => post('car/add',
    {
        StateNumber: StateNumber, RegionNumber:RegionNumber, 
        CarModel:CarModel, BodyNumber:BodyNumber, ChassisNumber:ChassisNumber, EngineNumber:EngineNumber,
        BodyModel:BodyModel,Color:Color, EngineCapacity:EngineCapacity, EnginePower:EnginePower,
        WheelLocation:WheelLocation, WheelDrive:WheelDrive, YearManufactured:YearManufactured,
        DateRegistration:DateRegistration, CarTaxPerYear:CarTaxPerYear
    }
)
export const GetCompanyModels = (brandName:string) => post('car/getcompanymodels', {brandName: brandName})
export const GetCurrentCar = async (query:string) => post('car/getcars', {query: query})
export const GetCurrentOrganization = async (query:string) => post('people/get/organization', {query: query})
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


