import { Schema, model, Model } from "mongoose";
import * as bcrypt from "bcryptjs";
export interface IUser {
    name: string;
    email: string;
    password: string;
}

interface IUserMethods {
    matchPassword(enteredPassword: string): boolean;
}

type IUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, IUserModel, IUserMethods>({
    name: {
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
