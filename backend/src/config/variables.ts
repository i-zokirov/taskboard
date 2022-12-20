import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.SECRET! as string;
export const MONGODB_URI = process.env.MONGODB_URI! as string;
