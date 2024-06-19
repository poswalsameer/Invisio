import nodemailer from "nodemailer";

export const mailerFunction = async ({receiverEmail, emailType, userId}:any) => {

    try {
        
        // TRANSPORTER SETUP WHICH WILL WORK ON HOW TO SEND THE MAIL
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

        // OBJECT THAT CONTAINS ALL THE INFO AND DETAILS OF THE MAIL
        const mailDetails = {
            from: "support@invisio.co", 
            to: receiverEmail, 
            subject: emailType === "VERIFY" ? "Verify your email" : " Reset your password " ,  
            html: "<b>Hello world?</b>", 
        }

        //FUNCTION THROUGH WHICH MAIL IS SENT
        const main = async () => {

            const mailResponse = await transporter.sendMail(mailDetails);

            return mailResponse;

        }


    } catch (error) {
        console.log("There is some error while sending the mail:", error);
        
    }

}