import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req: Request){

    const categories = await sql`select name from categories`
    console.log(categories)
    return NextResponse.json({status: 200, data: categories.rows})
}