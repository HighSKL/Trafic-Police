import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const candidateJurPeople = await sql`SELECT juridical_person.id, streets.name as street_name, place_house, place_room, organization_name, director_first_name, director_last_name, director_patronymic_name, director_phone_number
    FROM juridical_person join streets on juridical_person.place_street_id = streets.id WHERE juridical_person.id = ${body.query}`

    return NextResponse.json({status: 200, data: candidateJurPeople.rows[0]})
}