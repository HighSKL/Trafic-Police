import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const candidateCompDriverPeople = await sql`SELECT company_driver.id, data_passport_inssued, driver_lic_number, driver_lic_date_inssued, first_name, last_name, patronymic, phone_number, streets.name as street_name, place_house, place_room, passport_series, passport_number, who_passport_inssued
    FROM company_driver join streets on company_driver.palce_street_id = streets.id WHERE company_driver.id = ${body.query}`

    return NextResponse.json({status: 200, data: candidateCompDriverPeople.rows[0]})
}