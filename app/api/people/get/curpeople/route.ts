import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    const body = await req.json();
    const candidatePhysPeople = await sql`SELECT id, owner_name FROM physical_person WHERE owner_name LIKE ${"%"+body.query+"%"}`
    const physPeople: any = []
    async function getPeopleCar(peopleId: number){
        const cars = await sql`SELECT id, state_number, brand, model FROM cars WHERE owner_id = ${peopleId}`
        return cars.rows
    }
    candidatePhysPeople.rows.forEach(async (elem)=>{
        console.log(elem.id)
        physPeople.push({ id: elem.id, owner_name: elem.owner_name, 
            cars: getPeopleCar(elem.id)
        })
    })
    return NextResponse.json({status: 200, data: physPeople})
}