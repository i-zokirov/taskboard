import { Types } from "mongoose";
import { IUser } from "../../models/User.model";

declare global {
    namespace Express {
        export interface Request {
            user: Types.ObjectId | null;
        }
    }
}
