import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const inspectors = await sql`SELECT id, name FROM inspectors WHERE name LIKE ${"%"+body.query+"%"}`
    return NextResponse.json({status: 200, data: inspectors.rows})
}