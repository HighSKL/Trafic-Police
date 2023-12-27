import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const candidatePhysPeople = await sql`SELECT physical_person.id, data_passport_inssued, driver_lic_number, driver_lic_date_inssued, owner_name, phone_number, streets.name as street_name, place_house, place_room, passport_series, passport_number, who_passport_inssued
    FROM physical_person join streets on physical_person.place_street_id = streets.id WHERE physical_person.id = ${body.query}`

    return NextResponse.json({status: 200, data: candidatePhysPeople.rows[0]})
}