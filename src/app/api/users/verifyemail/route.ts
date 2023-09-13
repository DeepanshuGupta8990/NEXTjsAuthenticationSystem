import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyTokem:token,verifyTokenExpiry:{$gt: Date.now()}});
         
        if(!user){
            return NextResponse.json({err:"Invalid token"},{status:400})
        }

        user.isVerified = true;
        user.verifyTokem = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message:"Email verified successfully",success:true})

    } catch (err:any) {
        console.log(err.message)
        return NextResponse.json({err:err.message},{status:500})
    }
}