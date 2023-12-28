import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
  const body = await req.json();

  await sql.query("UPDATE physical_person SET "+body.column_name+" = "+body.newValue+" where id = "+body.peopleId)
  
  return NextResponse.json({ status: 200 });
}
