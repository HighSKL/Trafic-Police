import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const candidatePhysPeople = await sql`SELECT id, owner_name FROM physical_person WHERE owner_name LIKE ${"%"+body.query+"%"}`
    const physPeople: any = []
    candidatePhysPeople.rows.forEach(async (elem)=>{
        physPeople.push({ id: elem.id, owner_name: elem.owner_name })
    })
    return NextResponse.json({status: 200, data: physPeople})
}