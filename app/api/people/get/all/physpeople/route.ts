import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(req: Request) {
    const physPeople = (await sql`SELECT id, owner_name, passport_series, passport_number FROM physical_person`).rows
    // const companyDrivers = (await sql`SELECT id, owner_name, passport_series, passport_number FROM company_driver`).rows
    
    // const people = physPeople.concat(companyDrivers)
    return NextResponse.json({status: 200, data: physPeople})
}