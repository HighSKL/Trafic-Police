import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const owner_id = Math.floor(Math.random()*999999999)

    const street = (await sql`SELECT id FROM streets WHERE name = ${body.Place_street}`).rows[0].id

    // add people to db
    await sql`INSERT INTO company_driver VALUES (
        ${owner_id}, ${body.OrganizationId}, ${street}, ${body.Place_house}, ${body.Place_room}, ${body.PassportSeries},
        ${body.PassportNumber}, ${body.WhoPassportGived}, ${body.DatePassportGived}, ${body.DriverlicenseNumber}, 
        ${body.DriverlicenseGivedData}, ${body.OwnerName}, ${body.PhoneNumber})`

    // add people categories to db
    body.Categories.forEach( async (category: string) =>{
        const categoryId = (await sql`SELECT id FROM categories WHERE name = ${category}`).rows[0].id
        await sql`INSERT INTO assigned_categories VALUES (${owner_id}, ${categoryId})`
    })

    return NextResponse.json({status: 200})
}