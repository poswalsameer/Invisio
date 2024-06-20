import User from "@/models/user.model";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';

export const mailerFunction = async ({receiverEmail, emailType, userId}:any) => {

    try {

        // CONFIGURING MAIL ACCORDING TO THE TYPE OF IT, EITHER VERIFY OR RESET PASSWORD


        //GENERATING A TOKEN TO SEND THROUGH MAIL
        const hashedToken = uuidv4();
        console.log(" The generated hashed token is: ", hashedToken);
        
        if( emailType === "VERIFY" ){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }
        else if( emailType === "RESET" ){
            await User.findByIdAndUpdate( userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000
            } )
        }

        
        // TRANSPORTER SETUP WHICH WILL WORK ON HOW TO SEND THE MAIL
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c7b94ce8614e07",   // shouldn't be here, should be in env
              pass: "38bcc3ea3fdf16"    // shouldn't be here, should be in env
            }
          });

        // OBJECT THAT CONTAINS ALL THE INFO AND DETAILS OF THE MAIL
        const mailDetails = {
            from: "support@invisio.co", 
            to: receiverEmail, 
            subject: emailType === "VERIFY" ? "Verify your email" : " Reset your password " ,  
            html: ` <p> Click <a href="${process.env.DOMAIN}/${ emailType === "VERIFY" ? "verifyemail" : "resetpassword" }?token=${hashedToken}" >here</a> to ${ emailType === "VERIFY" ? "verify your email" : "reset your password" } or copy paste the link in your browser
            <br>
            ${process.env.DOMAIN}/${ emailType === "VERIFY" ? "verifyemail" : "resetpassword" }?token=${hashedToken}
            </p> `, 
        }

        //FUNCTION THROUGH WHICH MAIL IS SENT
        const main = async () => {

            const mailResponse = await transport.sendMail(mailDetails);

            return mailResponse;

        }


    } catch (error) {
        console.log("There is some error while sending the mail:", error);
        
    }

}