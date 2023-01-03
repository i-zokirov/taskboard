import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/variables";
import User, { IUser } from "../models/User.model";

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const payload: { userId: string } | JwtPayload = jwt.verify(
                token,
                JWT_SECRET
            ) as JwtPayload;

            req.user = await User.findById(payload.userId);
            next();
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error occured while token validation", error);
            }
            res.status(401);
            throw new Error("Not authorized, token validation failed!");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized!");
    }
};

export default authenticate;
