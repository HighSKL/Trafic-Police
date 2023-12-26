import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(req: Request) {
    const cars = await sql `select 
    cars.state_number, cars.region_number, car_brands_models.name as models, car_brands.name as brand from cars 
    join car_brands_models on cars.model = car_brands_models.id::varchar 
    inner join car_brands on cars.brand = car_brands.id::varchar`
    return NextResponse.json({ status: 200, data: cars.rows});
}

export async function POST(req: Request) {
    const body = await req.json();
    const cars = await sql`select 
    cars.state_number, cars.region_number, car_brands_models.name as model, car_brands.name as brand from cars 
    join car_brands_models on cars.model = car_brands_models.id::varchar
    inner join car_brands on cars.brand = car_brands.id::varchar
    WHERE cars.state_number LIKE ${"%"+body.query+"%"}`
    return NextResponse.json({status: 200, data: cars.rows})
}