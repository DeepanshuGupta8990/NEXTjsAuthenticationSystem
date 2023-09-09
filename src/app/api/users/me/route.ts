import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request:NextRequest){
    try{
        const userId = await getDataFromToken(request);
        const userData = await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({
            message:'Found',
            data:userData
        })
    }catch(err:any){
        return NextResponse.json({err:err.message,status:400})
    }
}