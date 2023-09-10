import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any)=>{
   try{
      //create a hashed token
      const hashedToken = await bcryptjs.hash(userId.toString(),10);
      if(emailType === 'VERIFY'){
         await User.findByIdAndUpdate(userId,
            {verifyTokem:hashedToken,
               verifyTokenExpiry:Date.now() + 3600000})
      }else if(emailType === 'RESET'){
         await User.findByIdAndUpdate(userId,
            {forgotPassswordToken:hashedToken,
               forgotPasswordTokenExpiry:Date.now() + 3600000})
      }

      var transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
           user: "ca964809b99e6c",
           pass: "f3ad824eae5b94"
         }
       });

       const mailOptions = {
         from : "deepanshuguptaa617@gmail.com",
         to:email,
         subject: emailType==='VERIFY'?"Verify your email":"Reset your password",
         html: `<p>Click <a href="http://localhost:3000/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
         or copy and paste the link below in your browser. <br> http://localhost:3000/verifyemail?token=${hashedToken}
         </p>`
       }

       const mailResponse = await transport.sendMail(mailOptions);
       return mailResponse;
   }catch(err:any){
      throw new Error(err.message); 
   }
}