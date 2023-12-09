export type Car = {
    body_model: string|null,
    body_number: number|null,
    brand: string|null,
    car_img: string|null,
    car_tax_per_year: number|null,
    chassis_number: number|null,
    color: string|null,
    date_registration: number|null,
    engine_capacity: number|null,
    engine_number: number|null,
    engine_power: number|null,
    id: number|null,
    inspection_ticket_id: number|null,
    model: string|null,
    owner_id: number|null,
    region_number: string|null,
    state_number: string|null,
    wheel_drive: string|null,
    wheel_location: string|null,
    year_manufactured: number|null
}

export type PersonFieldType = {
    title: string,
    name: string,
    findCarNeed?: boolean
    categories?: Array<string>
}

export type CarItemFindCarType = {
    id: number,
    state_number: string,
    brand: string,
    model: string
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