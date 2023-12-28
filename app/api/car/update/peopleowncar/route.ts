import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
  const body = await req.json();

//   console.log(body.peopleId+ "bbb"+ body.newCarsArr)
  await sql.query("UPDATE cars SET owner_id = null where owner_id = "+body.peopleId)

  body.newCarsArr.forEach(async (car:any)=>{
    console.log(car.id)
    await sql.query("UPDATE cars SET owner_id = "+body.peopleId+" where id = "+car.id)
  })
  
  return NextResponse.json({ status: 200 });
}
