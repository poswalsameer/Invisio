import { connect } from "@/dbConnect/dbConnect";
import User from '../../../models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { mailerFunction } from '../../../utils/mailer';

//CONNECTION OF DB
connect();

export const POST = async (request: NextRequest) => {

    try {
        const reqBodyData = request.json();
        const { username, email, password }:any = reqBodyData;

        const findUser = await User.findOne({email});

        //CHECKING IF THE ENTERED MAIL ALREADY EXISTS IN THE DB OR NOT
        if(findUser){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }

        const existingUsername = await User.findOne({username});

        // CHECKING IF A USER EXISTS WITH THE SAME USERNAME IN THE DB OR NOT
        if(existingUsername){
            return NextResponse.json(
                {error: "Entered username already exists"}
            )
        }

        //HASHING THE PASSWORD AND SAVING THE HASHED PASSWORD IN THE DB
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const updatedUserDetails = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUpdatedUser = await updatedUserDetails.save();
        console.log(savedUpdatedUser);


        // SENDING VERIFICTION EMAIL TO THE USER AFTER SIGNUP IS DONE
        await mailerFunction({email, emailType: "VERIFY", userId: savedUpdatedUser._id});

        //SENDIND OK RESPONSE
        return NextResponse.json({
            message: "User registered succesfully",
            success: true,
            status: 200
        })
        

    } catch (error) {
        
        return NextResponse.json(
            {error},
            {status: 500}
            );
    }

}