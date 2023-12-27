import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const cars = await sql `select 
    cars.id, cars.state_number, cars.region_number, cars.region_number, car_brands_models.name as models, car_brands.name as brand, cars.body_number , cars.chassis_number, cars.engine_number, body_type.name as body_model, cars.color, cars.engine_capacity, cars.engine_power, cars.wheel_location, cars.wheel_drive, cars.year_manufactured, cars.date_registration, cars.car_tax_per_year, cars.inspection_ticket_id
    from cars
    join car_brands_models on cars.model = car_brands_models.id::varchar 
    inner join car_brands on cars.brand = car_brands.id::varchar
    inner join body_type on cars.body_model_id = body_type.id::varchar where cars.id = ${body.query}`
    return NextResponse.json({ status: 200, data: cars.rows[0]});
}