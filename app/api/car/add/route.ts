import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const {id: CarModelId, car_brand_id: CarBrandId} = (await sql`SELECT id, car_brand_id FROM car_brands_models WHERE name = ${body.CarModel}`).rows[0]
    const bodyModel = (await sql`SELECT id FROM body_type WHERE name = ${body.BodyModel}`).rows[0].id
    await sql `INSERT INTO cars
    VALUES(${Math.floor(Math.random()*999999999)}, ${body.StateNumber}, ${body.RegionNumber}, ${CarBrandId}, ${CarModelId},
        ${body.BodyNumber},${body.ChassisNumber}, ${body.EngineNumber}, ${bodyModel}, ${body.Color}, 
        ${body.EngineCapacity},${body.EnginePower}, ${body.WheelLocation}, ${body.WheelDrive}, ${body.YearManufactured}, 
        ${body.DateRegistration}, 0, ${body.CarTaxPerYear})`
    return NextResponse.json({ status: 200 });
}