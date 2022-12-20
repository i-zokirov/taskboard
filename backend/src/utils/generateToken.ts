import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from "../config/variables";

const generateToken = (userId: any) => {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "10h",
    } as SignOptions);
};

export default generateToken;
