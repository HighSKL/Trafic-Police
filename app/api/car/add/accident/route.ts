import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const traffic_accident_id = Math.floor(Math.random()*999)
    
    const street = (await sql`SELECT id FROM streets WHERE name = ${body.Place_street}`).rows[0].id
    
    body.participants.forEach(async (participant:{id: number, owner_name:string, car: string}) => {
        const partcar = (await sql`select id from cars where state_number = ${participant.car.split(' ')[0]}`).rows[0].id
        const partpeople = (await sql`select id from physical_person where Owner_name = ${participant.owner_name}`).rows[0].id
        await sql`INSERT INTO participants_accident VALUES (${traffic_accident_id}, ${partcar}, ${partpeople})`
    })
    
    await sql`INSERT INTO traffic_accident VALUES (${traffic_accident_id}, ${body.InspectorId}, ${street}, '')`
    return NextResponse.json({status: 200})
}