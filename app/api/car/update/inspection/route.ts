import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
  const body = await req.json();

  await sql.query("UPDATE technical_inspections SET "+body.column_name+" = "+body.newValue+" where owner_id = "+body.carId)
  
  return NextResponse.json({ status: 200 });
}
