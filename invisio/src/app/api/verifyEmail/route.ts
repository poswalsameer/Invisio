import { connect } from "@/dbConnect/dbConnect";
import User from '../../../models/user.model';
import { NextRequest, NextResponse } from 'next/server';

//CONNECTION OF DB
connect();

export const POST = async ( request: NextRequest ) => {

    try {
        
        const reqBodyData = await request.json();
        const {token} = reqBodyData;
        console.log(token);

        //FINDING THE USER WITH THE SAME TOKEN NUMBER, ALSO CHECKING THAT THE TOKEN HAS NOT EXPIRED
        const findUser = await User.findOne(
            {verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}}
            )
        
        // IF USER NOT FOUND
        if( !findUser ){
            return NextResponse.json(
                {message: "Cannot find the user or invalid token"},
                {status: 400}
            )
        }

        console.log(findUser);

        // UPDATING THE DATA MODEL, AFTER USER IS VERIFIED
        findUser.isVerified = true;
        findUser.verifyToken = undefined;
        findUser.verifyTokenExpiry = undefined;

        // SAVING THE UDPATED USER
        await findUser.save();

        return NextResponse.json(
            {message: "User verified successfully"},
            {status: 200}
        )
        

    } catch (error) {

        return NextResponse.json(
            {error: "Error while verifying the user"},
            {status: 500}
            )
        
    }

}