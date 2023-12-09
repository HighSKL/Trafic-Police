import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    const bodyModels = await sql`SELECT * FROM body_type`
    return NextResponse.json({status: 200, data: bodyModels.rows})
}