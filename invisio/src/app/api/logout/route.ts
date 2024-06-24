import { connect } from "../../../dbConnect/dbConnect";
import User from '../../../models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { mailerFunction } from '../../../utils/mailer';

// CONNECTION OF DB
connect();

export const GET = async ( request: NextRequest ) => {

    try {
        
        const logoutResponse = NextResponse.json(
            {message: "User logged out successfully"},
            {status: 200}
        )

        // UN-SETTING THE COOKIES AFTER LOGGING OUT THE USER
        logoutResponse.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return logoutResponse;

    } catch (error) {
        return NextResponse.json(
            {error: "Cannot logout the user"},
            {status: 500}
        )
    }

}