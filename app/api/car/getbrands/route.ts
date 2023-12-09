import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    let models = await sql`SELECT name FROM car_brands`
    return NextResponse.json({status: 200, data: models.rows})
}