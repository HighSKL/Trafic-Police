import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req: Request){

    let allAccidents: any = []

    const traficAccident = (await sql`select traffic_accident.id, inspectors.name as insp_name, streets.name as street_name, traffic_accident.description
    from traffic_accident join inspectors on traffic_accident.inspector_id = inspectors.id inner join streets on traffic_accident.place_id = streets.id`).rows


    for(let i = 0; i < traficAccident.length; i++){
        const accidentParts = (await sql`select * from participants_accident where traffic_accident_id = ${traficAccident[i].id}`).rows

        let Parts = {
            person: [] as any,
            cars: [] as any
        }

        for(let i = 0; i < accidentParts.length; i++){
            const carPart = (await sql `select 
            cars.id, cars.state_number, cars.region_number, cars.region_number, car_brands_models.name as models, car_brands.name as brand, cars.body_number , cars.chassis_number, cars.engine_number, body_type.name as body_model, cars.color, cars.engine_capacity, cars.engine_power, cars.wheel_location, cars.wheel_drive, cars.year_manufactured, cars.date_registration, cars.car_tax_per_year, cars.inspection_ticket_id
            from cars
            join car_brands_models on cars.model = car_brands_models.id::varchar 
            inner join car_brands on cars.brand = car_brands.id::varchar
            inner join body_type on cars.body_model_id = body_type.id::varchar where cars.id = ${accidentParts[i].car_id}`).rows[0]

            Parts.cars.push(carPart)

            const personPart = (await sql`SELECT physical_person.id, data_passport_inssued, driver_lic_number, driver_lic_date_inssued, first_name, last_name, patronymic, phone_number, streets.name as street_name, place_house, place_room, passport_series, passport_number, who_passport_inssued
            FROM physical_person join streets on physical_person.place_street_id = streets.id WHERE physical_person.id = ${accidentParts[i].people_id}`).rows[0]

            
            Parts.person.push(personPart)

        }

        const dto = {
            accident_id: traficAccident[i].id,
            insp_name: traficAccident[i].insp_name,
            street: traficAccident[i].street_name,
            description: traficAccident[i].description,
            parts: {...Parts}
        }
        allAccidents.push(dto)
    }

    return NextResponse.json({status: 200, data: allAccidents})
}