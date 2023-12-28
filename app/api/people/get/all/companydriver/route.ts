import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(req: Request) {
    // const physPeople = (await sql`SELECT id, owner_name, passport_series, passport_number FROM physical_person`).rows
    const companyDrivers = (await sql`SELECT company_driver.id, owner_name, passport_series, passport_number, juridical_person.Organization_name as organization_name
    FROM company_driver join juridical_person on company_driver.organization_id = juridical_person.id`).rows
    
    // const people = physPeople.concat(companyDrivers)
    return NextResponse.json({status: 200, data: companyDrivers})
}