import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const candidatePhysPeople = await sql`SELECT id, first_name, last_name, passport_series, passport_number FROM physical_person WHERE passport_number::varchar LIKE ${"%"+body.query+"%"}`
    const physPeople: any = []
    candidatePhysPeople.rows.forEach(async (elem)=>{
        physPeople.push({ id: elem.id, first_name: elem.first_name, last_name: elem.last_name,
        passport_series: elem.passport_series, passport_number: elem.passport_number})
    })
    return NextResponse.json({status: 200, data: physPeople})
}