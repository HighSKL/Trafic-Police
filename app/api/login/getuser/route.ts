import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken"
import apiErrors from "@/app/modules/errorsCode/apiErrors";
import { DecodedUserType } from "@/app/types/types";
import { secretToken } from "@/config";

export async function GET(req: NextRequest) {
    const token = await cookies().get('refreshToken')?.value
    console.log(token)
    if(!token)
        return NextResponse.json(apiErrors.UserNotAuthorized())
    
    try {
        var DecodedUser = await jwt.verify(token, secretToken)
    } catch (err) {
        return NextResponse.json(apiErrors.UserNotAuthorized())
    }

    const userData = await sql`select * from special_users_data where id = ${(DecodedUser as DecodedUserType).userID}`

    return NextResponse.json(userData.rows[0])
}
