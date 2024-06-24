import { connect } from "@/dbConnect/dbConnect";
import User from '../../../models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

//CONNECTION OF DB
connect();

export const POST = async ( request: NextRequest ) => {

    try {

        const reqBodyData = await request.json();
        const { email, password }:any = reqBodyData;

        // SEARCHIND THE DB FOR THE ENTERED EMAIL/USERNAME
        const searchUser = await User.findOne({email});

        // IF USER NOT FOUND
        if( !searchUser ){
            return NextResponse.json(
                { message: "User does not exist" },
                {status: 400}
            )
        }

        console.log("User exists:", email);

        // MATCHING THE ENTERED PASSWORD WITH THE STORED HASHED PASSWORD
        const passwordMatch = await bcryptjs.compare(password, searchUser.password);

        if( !passwordMatch ){
            return NextResponse.json(
                {message: "Incorrect Password entered"},
                {status: 400}
            )
        }       

        // SINCE BOTH EMAIL AND PASSWORD, CREATING A JWT FOR CREATING A SESSION FOR THE USER

        // creating payload/data for token
        const tokenData = {
            id: searchUser._id,
        }

        //creating the jwt token which will expire after 1 day
        const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {expiresIn: '1d'});

        // the log in response after user has logged in successfully
        const logInResponse = NextResponse.json(
            {message: "User logged in Successfully"},
            {status: 200}
        )

        //setting the cookies
        logInResponse.cookies.set("token", jwtToken, {
            httpOnly: true
        })

        // finally returning the response
        return logInResponse;
        
    } catch (error) {
        
        return NextResponse.json(
            {error: "error while logging the user in"},
            {status: 500}
        )

    }

}