import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user doesn't exist");
      return NextResponse.json({ err: "User doesn't exist", status: 400 });
    }

    //check if password is correct
    const validPassowrd = await bcryptjs.compare(password,user.password);
    if(!validPassowrd){
        return NextResponse.json({ err: "Invalid passowrd", status: 400 });
    }

    //create token data
    const tokenData = {
        id:user._id,
        username:user.username,
        email:user.email
    }
    //create token
    const token = await jwt.sign(tokenData,'deepugupta',{expiresIn:"1h"});
    const response = NextResponse.json({
        message:"Login Successfull",
        userProfile:user,
        success:true,
        
    })
    console.log('success')
    response.cookies.set("token",token,{httpOnly:true})

    return response;

  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ err: err.message, status: 500,success:false });
  }
}
