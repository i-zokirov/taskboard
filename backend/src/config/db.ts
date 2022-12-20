import mongoose, { ConnectOptions } from "mongoose";
import { MONGODB_URI } from "./variables";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.info(`MONGODB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("DB CONNECTION ERROR!");
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
