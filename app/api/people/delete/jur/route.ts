import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    await sql`delete from juridical_person where id = ${body.query}`
    // await sql`delete from technical_inspections where owner_id = ${body.query}`
    return NextResponse.json({status: 200})
}