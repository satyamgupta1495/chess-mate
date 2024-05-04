import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongo db connected : DB Host - `, connectioninstance.connection.host)
    } catch (error) {
        console.log('Mongoose error : ', error)
        process.exit(1)
    }
}

export default connectDB