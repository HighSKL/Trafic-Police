import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const ticket_id = Math.floor(Math.random()*999999999)
    const ticket_number = Math.floor(Math.random()*999999999)
    
    // add technical inspection to db
    await sql`INSERT INTO technical_inspections VALUES (${ticket_id}, ${body.InspectedCarId}, ${ticket_number}, ${body.Date_inssue}, ${body.InspectorId}, ${body.Mileage}, ${body.Payment_amount}, ${body.Payment_technical_inspection_ticket_gived} )`
    return NextResponse.json({status: 200})
}