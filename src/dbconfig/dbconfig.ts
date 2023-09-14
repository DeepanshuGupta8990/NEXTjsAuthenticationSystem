import mongoose from "mongoose";
export async function connect(){
    // try{
    //    mongoose.connect(process.env.MONGO_URL!)
    //    .then(()=>{
    //     console.log("Db connected succesfully");
    //   }).catch((err)=>{
    //     console.log(err.message);
    //     process.exit(); 
    //   })
    // }
    try{
        mongoose.connect(process.env.MONGO_URL!)
        .then(()=>{
          console.log("Db connected");
        }).catch((err)=>{
          console.log(err.message)
        })
      }
    catch(err:any){
        console.log('Something goes wrong')
        console.log(err.message)
    }
}