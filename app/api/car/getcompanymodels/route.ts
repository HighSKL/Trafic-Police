import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const brandId = await sql`SELECT id FROM car_brands WHERE name = ${body.brandName};`
    const models = await sql`SELECT name FROM car_brands_models WHERE car_brand_id = ${brandId.rows[0].id};`
    return NextResponse.json({status:200, data: models.rows})
}