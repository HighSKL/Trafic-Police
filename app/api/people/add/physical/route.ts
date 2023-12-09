import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const owner_id = Math.floor(Math.random()*999999999)

    // add people to db
    await sql`INSERT INTO physical_person VALUES (
        ${owner_id}, ${body.Email}, ${body.OwnerName}, ${body.Ownerphonenumber}, ${body.Categories})`
    // add people passport data to db
    await sql`INSERT INTO passport_data VALUES (${owner_id}, ${body.PassportSeries}, ${body.PassportNumber}, 
        ${body.WhoPassportGived}, ${body.DatePassportGived})`
    // add people driver license data to db
    await sql`INSERT INTO license_data VALUES (${owner_id}, ${body.DriverlicenseNumber}, ${body.DriverlicenseGivedData})`
    // set cars owner into db
    if(body.CarsOwn.length > 0){
        body.CarsOwn.map(async (elem: number)=>{
            await sql`update cars set owner_id = ${owner_id} where id = ${elem}`
        })
    }

    return NextResponse.json({status: 200})
}