import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URI;
    try{
        await mongoose.connect(mongoUrl);
        console.log("MongosDB connected");
    } catch (error){
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
};

export default connectDB;