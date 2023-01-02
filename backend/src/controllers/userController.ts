import { RequestHandler } from "express";

import User from "../models/User.model";
import generateToken from "../utils/generateToken";

export const registerUser: RequestHandler = async (req, res) => {
    const { email, firstName, lastName, marketingConsent, password } = req.body;
    const user = await User.create({
        email,
        firstName,
        lastName,
        marketingConsent,
        password,
    });
    if (user) res.status(201).json(user);
};

export const loginUser: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        res.json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
};
