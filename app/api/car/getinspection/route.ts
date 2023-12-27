import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(req: Request) {
    const company = (await sql`SELECT technical_inspections.id, cars.state_number, technical_inspections.Inspection_ticket_number as Inspection_ticket_number, technical_inspections.Date_inssue as Date_inssue 
    FROM technical_inspections join cars on technical_inspections.owner_id = cars.id`).rows
    return NextResponse.json({status: 200, data: company})
}