import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest){
   try {
    const reqBody = await request.json();
    const {email} = reqBody;
    console.log(reqBody);

    const user = await User.findOne({email})
    console.log(user)
    if(!user){
        return NextResponse.json({err:"Email is not registered",success:false})
    }
    const sentEmail = await sendEmail({email,emailType:"RESET",userId:user._id})
    return NextResponse.json({message:"Email avaliable",success:true})
   } catch (err:any) {
     console.log(err.message);
     return NextResponse.json({err:err.message},{status:500})
   }
}