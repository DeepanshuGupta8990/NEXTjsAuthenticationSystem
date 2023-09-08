import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('dddddsdasdsdsad')
    const response = NextResponse.json({
        message:"Logout succesfully",
        success: true
    });
    response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
    return response
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      err: err.message,
      status: 500,
    });
  }
}
