export type Car = {
    body_model: string|null;
    body_number: number|null;
    brand: string|null;
    car_img: string|null;
    car_tax_per_year: number|null;
    chassis_number: number|null;
    color: string|null;
    date_registration: number|null;
    engine_capacity: number|null;
    engine_number: number|null;
    engine_power: number|null;
    id: number|null;
    inspection_ticket_id: number|null;
    model: string|null;
    owner_id: number|null;
    region_number: string|null;
    state_number: string|null;
    wheel_drive: string|null;
    wheel_location: string|null;
    year_manufactured: number|null;
}

export type FieldCar = {
    title: string;
    name: string;
    errorMessage: string;
    validate?: RegExp;
    list?:  string[]|null;
    date?: boolean;
    isBrands?: boolean;
    changeFieldFunc?: any
}

export type PersonFieldType = {
    title: string;
    name: string;
    errorMessage: string;
    findCarNeed?: boolean;
    findOrganizationNeed?: boolean;
    categories?: string[]|null;
    validate?: RegExp;
    date?: boolean;
    list?: string[]|null;
    elementController?: {need: boolean, controller: any};
}

export type CarItemFindCarType = {
    id: number;
    state_number: string;
    brand: string;
    model: string;
}


export type OrganizationItemFindOrgType = {
    id: number;
    organization_name: string;
}

export type InspectorItemFindOrgType = {
    id: number;
    name: string;
}

export type FormikAddPeopleType = {
    OwnCar?: string;
    Email?: boolean;
    OwnerName?: string;
    Ownerphonenumber?: string;
    PassportSeries?: string;
    PassportNumber?: string;
    WhoPassportGived?: string;
    DatePassportGived?: string;
    DriverlicenseNumber?: string;
    DriverlicenseGivedData?: string;
    Organization_address?: string;
    Organization_name?: string;
    DirectorName?: string;
    Directorphonenumber?: string;
}

export type KeyValue = {
    id: number;
    name: string;
}

export type DecodedUserType = {
    userID: number,
    email: string
}

export type ErrorResponesType = {
    status: number,
    message: string
}

export type UserDataType = {
    email: string,
    id: number,
    status?: number
}

export type FindPeopleObjType = {
    id: number;
    first_name: string;
    last_name: string;
    patronymic?: string;
    passport_series: number;
    passport_number: number;
}

export type PeopleType = {
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    passport_series: number;
    passport_number: number;
}

export type CompanyType = {
    id: number;
    organization_name: string;
    director_first_name: string;
    director_last_name: string;
    director_patronymic_name: string;
    director_phone_number: string;
}

export type InpectionType = {
    id: number;
    state_number: string;
    inspection_ticket_number: number;
    date_inssue: string;
}


export type DriverCompanyType = {
    id: number;
    organization_name: string;
    passport_series: number;
    passport_number: number;
    first_name: string;
    last_name: string;
    patronymic: string;
}

export type TraficAccidentDataType = {
    accident_id: number;
    insp_name: string;
    street: string;
    description: string;
    parts: any
}