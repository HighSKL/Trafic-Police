const get = async (path: string) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, { cache: 'no-store' }).then(res=>res.json()))
const post = async (path: string, data: Object) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, {method: "POST", body: JSON.stringify(data)}).then(res=>res.json()))

//GET
export const GetCars = () => get('car/getcars')
export const GetPeople = () => get('people/get/all/physpeople')
export const GetCompany = () => get('people/get/all/jurpeople')
export const GetInspecton = () => get('car/getinspection')
export const GetBrands = () => get('car/getbrands')
export const GetBodyModels = () => get('car/getbodymodels')
export const GetStreets = () => get('streets')
export const GetCategories = () => get('categories')
export const GetUser = () => get('login/getuser')
//POST
export const getCurrCar = (query: number) => post('car/getcurrentcardata', {query: query})
export const authUser = (email: string, password: string) => post('login', { email, password })
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
export const GetPeopleOwnCars = async (peopleID:number) => post('car/getowncars', {peopleID: peopleID})
export const GetCurrentCar = async (query:string) => post('car/getcars', {query: query})
export const GetCurrentOrganization = async (query:string) => post('people/get/organization', {query: query})
export const GetCurrentInspector = async (query:string) => post('people/get/inspector', {query: query})
export const GetCurrentPeople = async (query:string) => post('people/get/curpeople', {query: query})
export const AddPeoplePhys = async (CarsOwn: Array<number>, Place_street: string, Place_house: string, Place_room: string, 
    OwnerName: string, PhoneNumber: string, PassportSeries: number, PassportNumber: number, WhoPassportGived: string,
    DatePassportGived: string, DriverlicenseNumber: number, DriverlicenseGivedData: string, Categories: string[]
    ) => post('people/add/physical',
    {
        CarsOwn: CarsOwn, Place_street: Place_street, Place_house: Place_house, Place_room: Place_room, 
        OwnerName: OwnerName, PhoneNumber: PhoneNumber, PassportSeries: PassportSeries, PassportNumber: PassportNumber,
        WhoPassportGived: WhoPassportGived, DatePassportGived: DatePassportGived,  DriverlicenseNumber: DriverlicenseNumber, 
        DriverlicenseGivedData: DriverlicenseGivedData, Categories: Categories
    }
)
export const AddPeopleJur=async(CarsOwn: Array<number>, Place_street: string, Place_house: string, Place_room: string,
    Organization_name: string, DirectorName: string, Directorphonenumber: string) => post('people/add/juridical',
    {
        CarsOwn: CarsOwn, Place_street: Place_street, Place_house: Place_house, Place_room:Place_room,
        Organization_name: Organization_name, DirectorName: DirectorName, Directorphonenumber: Directorphonenumber
    }
)
export const AddCompanyDriver = async (OrganizationId: number, Place_street: string, Place_house: string, Place_room: string, 
    OwnerName: string, PhoneNumber: string, PassportSeries: number, PassportNumber: number, WhoPassportGived: string,
    DatePassportGived: string, DriverlicenseNumber: number, DriverlicenseGivedData: string, Categories: string[]
    ) => post('people/add/companydriver',
    {
        OrganizationId: OrganizationId, Place_street: Place_street, Place_house: Place_house, Place_room: Place_room, 
        OwnerName: OwnerName, PhoneNumber: PhoneNumber, PassportSeries: PassportSeries, PassportNumber: PassportNumber,
        WhoPassportGived: WhoPassportGived, DatePassportGived: DatePassportGived,  DriverlicenseNumber: DriverlicenseNumber, 
        DriverlicenseGivedData: DriverlicenseGivedData, Categories: Categories
    }
)
export const AddTechnicalInspection = async (InspectedCarId: number, Date_inssue: string, InspectorId:number,
    Mileage: number, Payment_amount: number, Payment_technical_inspection_ticket_gived: number
    ) => post('car/add/technicalinspection', 
    {
        InspectedCarId: InspectedCarId, Date_inssue: Date_inssue, InspectorId: InspectorId, Mileage:Mileage,
        Payment_amount:Payment_amount, Payment_technical_inspection_ticket_gived: Payment_technical_inspection_ticket_gived
    }
)

export const AddAccident = async (Place_street:string, chosenInspectorId: number, Description:string, participants: any) => post('car/add/accident', 
    {
        Place_street:Place_street, InspectorId: chosenInspectorId, Description: Description, participants: participants
    }
)

export const GetCurrentInspection = async (carid: number) => post('car/getinspection', {carid: carid})
export const GetCurrPeople = async (query: number) => post('people/get/currentpeople', {query: query})
//
//DELETE 
export const deleteCar = (query: number) => post('car/delete', {query: query})
//UPDATE
export const ChangeDataCars = (column_name:string, newValue: any, carId: number) => post('car/update/car', {column_name: column_name, newValue: newValue, carId:carId})
export const ChangeDataInspection = (column_name:string, newValue: any, carId: number) => post('car/update/inspection', {column_name: column_name, newValue: newValue, carId:carId})