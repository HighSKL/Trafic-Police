import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(req: Request) {
    const company = (await sql`SELECT id, organization_name, director_name, director_phone_number FROM juridical_person`).rows
    return NextResponse.json({status: 200, data: company})
}