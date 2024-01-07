import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json()

    const company = (await sql`SELECT organization_id, juridical_person.organization_name as organization_name
    FROM company_driver join juridical_person on company_driver.organization_id = juridical_person.id where company_driver.id = ${body.companyDriverId}`).rows

    return NextResponse.json({status: 200, data: company})
}