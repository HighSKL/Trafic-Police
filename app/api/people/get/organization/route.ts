import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const oranizations = await sql`SELECT id, organization_name FROM juridical_person WHERE organization_name LIKE ${"%"+body.query+"%"}`
    return NextResponse.json({status: 200, data: oranizations.rows})
}