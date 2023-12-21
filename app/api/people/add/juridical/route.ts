import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const owner_id = Math.floor(Math.random()*999999999)

    const street = (await sql`SELECT id FROM streets WHERE name = ${body.Place_street}`).rows[0].id

    // add organization to db
    await sql`INSERT INTO juridical_person VALUES (
        ${owner_id}, ${street}, ${body.Place_house}, ${body.Place_room}, ${body.Organization_name}, 
        ${body.DirectorName}, ${body.Directorphonenumber})`
    
    // set cars owner into db
    if(body.CarsOwn.length > 0){
        body.CarsOwn.map(async (elem: number)=>{
            await sql`update cars set owner_id = ${owner_id} where id = ${elem}`
        })
    }

    return NextResponse.json({status: 200})
}