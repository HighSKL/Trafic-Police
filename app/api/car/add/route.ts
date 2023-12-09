import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import apiErrors from "@/app/modules/errorsCode/apiErrors";

export async function POST(req: Request) {
    const body = await req.json();
    await sql `INSERT INTO cars
    VALUES(${Math.floor(Math.random()*999999999)}, 'none',${body.StateNumber}, ${body.RegionNumber}, ${body.Mark}, ${body.CarModel},
        ${body.BodyNumber},${body.ChassisNumber}, ${body.EngineNumber}, ${body.BodyModel}, ${body.Color}, 
        ${body.EngineCapacity},${body.EnginePower}, ${body.WheelLocation}, ${body.WheelDrive}, ${body.YearManufactured}, 
        ${body.DateRegistration},${body.InspectionTicketId}, ${body.CarTaxPerYear}, date_reg_ticket_gived: ${body.DateTicketGived})`
    return NextResponse.json({ status: 200 });
}