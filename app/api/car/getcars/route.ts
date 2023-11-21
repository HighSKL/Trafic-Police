import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import apiErrors from "@/app/modules/errorsCode/apiErrors";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const cars = await sql `SELECT * FROM cars`
    return NextResponse.json({ status: 200, data: cars.rows});
}

export async function POST(req: Request) {
    const body = await req.json();
    const cars = await sql`SELECT id, brand, model, state_number FROM cars WHERE state_number LIKE ${"%"+body.query+"%"}`
    return NextResponse.json({status: 200, data: cars.rows})
}