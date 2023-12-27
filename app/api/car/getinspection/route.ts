import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(req: Request) {
    const company = (await sql`SELECT technical_inspections.id, cars.state_number, technical_inspections.Inspection_ticket_number as Inspection_ticket_number, technical_inspections.Date_inssue as Date_inssue 
    FROM technical_inspections join cars on technical_inspections.owner_id = cars.id`).rows
    return NextResponse.json({status: 200, data: company})
}

export async function POST(req: Request){
    const body = await req.json()

    const inspection = await sql`SELECT technical_inspections.id, inspection_ticket_number, date_inssue, inspectors.name as inspector_name, inspectors.id as inspector_id, mileage, payment_amount, payment_technical_inspection_ticket_gived
    FROM technical_inspections join inspectors on technical_inspections.inspector_id = inspectors.id where owner_id = ${body.carid}`

    return NextResponse.json({status: 200, data: inspection.rows[0]})
}