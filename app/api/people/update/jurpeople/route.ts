import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
  const body = await req.json();
  if(body.newValue)
    await sql.query("UPDATE juridical_person SET "+body.column_name+" = "+body.newValue+" where id = "+body.companyId)
  
  return NextResponse.json({ status: 200 });
}
