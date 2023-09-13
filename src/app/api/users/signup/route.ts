import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    //check if user already exist
    if (user) {
        console.log('user already exist')
      return NextResponse.json({ err: "User already exist", status: 500 });
    }

    //bcrypt
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //creating new user

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log('savedUser',savedUser);

    //send verification email
    const sentEmail = await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

    return NextResponse.json({
      message: "User created succesfully",
      succes: true,
      savedUser: savedUser,
      status: 201,
    });
  } catch (err: any) {
    return NextResponse.json({ err: err.message, status: 500 });
  }
}
