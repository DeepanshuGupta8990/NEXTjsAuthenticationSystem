import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function PUT(request:NextRequest){
try {
    const reqBody = await request.json();
    const {password,confirmPassword,token} = reqBody;

    const user = await User.findOne({forgotPassswordToken:token,forgotPasswordTokenExpiry:{$gt: Date.now()}});

    if(!user){
        return NextResponse.json({err:"Invalid token"},{status:400})
    } 
    
    //bcrypt
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({message:'passwordChange',success:true})
} catch (err:any) {
    console.log(err.message)
    return NextResponse.json({err:err.message},{status:500})
}
}