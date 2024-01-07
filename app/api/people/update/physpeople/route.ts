import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body.column_name+ " "+body.newValue )

  if(body.newValue){
    // console.log ("UPDATE physical_person SET "+body.column_name+" = "+body.newValue+" where id = "+body.peopleId)
    if(body.newValue as string)
      await sql.query("UPDATE physical_person SET "+body.column_name+" = '"+body.newValue+"' where id = "+body.peopleId)
    else if(body.newValue as number)
      await sql.query("UPDATE physical_person SET "+body.column_name+" = "+body.newValue+" where id = "+body.peopleId)
    // await sql.query("UPDATE physical_person SET last_name = "+body.newValue+" where id = "+body.peopleId)
  }
  return NextResponse.json({ status: 200 });
}
