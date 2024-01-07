import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const person = await sql`select physical_person.id, physical_person.passport_series, physical_person.passport_number, physical_person.first_name, physical_person.last_name, physical_person.patronymic
     from cars join physical_person on cars.owner_id = physical_person.id where cars.id = ${body.car_id}`
    return NextResponse.json({status: 200, data: person.rows[0]});
}