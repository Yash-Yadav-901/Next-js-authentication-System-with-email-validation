import mongoose from "mongoose";

export default async function connect() {
    try{
        mongoose.connect(process.env.MONGODB_url!);
        const connection=mongoose.connection;

        connection.on('connect',()=>{
            console.log("connect successfully to databases!");
        })

        connection.on('err',(err)=>{
            console.log("error connecting mongodb ensure data base is up and running!",err);
            process.exit();
        })
    }
    catch(error){
        console.log("something went wrong while connecting to data base!");
        console.log(error);
    }
    
}