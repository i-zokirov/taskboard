import { Schema, model, Model, Types } from "mongoose";
import * as bcrypt from "bcryptjs";
export interface IUser {
    _id?: Types.ObjectId;
    firstName: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    marketingConsent?: boolean;
}

interface IUserMethods {
    matchPassword(enteredPassword: string): boolean;
}

type IUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, IUserModel, IUserMethods>({
    firstName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    marketingConsent: {
        type: Boolean,
        default: false,
    },
});

userSchema.method("matchPassword", async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
});

userSchema.pre("save", async function name(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = model<IUser, IUserModel>("User", userSchema);

export default User;
