import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const cars = await sql`
    select cars.state_number, car_brands_models.name as models, car_brands.name as brand from cars 
    join car_brands_models on cars.model = car_brands_models.id::varchar 
    inner join car_brands on cars.brand = car_brands.id::varchar WHERE cars.owner_id = ${parseInt(body.peopleID)}`
    return NextResponse.json({status: 200, data: cars.rows})
}