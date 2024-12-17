// mongodb
import mongoose from "mongoose"

async function connectMongoDb(url){
    try{
        const db =  await mongoose.connect(url)
        return db
    }catch(error){
        return error;
    }
}

export default connectMongoDb

