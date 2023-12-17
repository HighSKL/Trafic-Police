import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const streets = await sql`SELECT name FROM streets`

    return NextResponse.json({status: 200, data: streets.rows})
}