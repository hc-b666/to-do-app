import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../models/user";

export const getAuthUser: RequestHandler = async (req, res, next) => {
    const authUser = req.session.userId;

    try {
        const user = await User.findById(authUser).select("+email").exec();

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

interface SignupBody {
    username?: string;
    email?: string;
    password?: string;
}

export const signup: RequestHandler<
    unknown,
    unknown,
    SignupBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const rawPassword = req.body.password;

    try {
        if (!username || !email || !rawPassword) {
            throw createHttpError(400, "Parameters are missing!");
        }

        const existingUsername = await User.findOne({
            username: username,
        }).exec();

        if (existingUsername) {
            throw createHttpError(
                409,
                "Username already exists. Please, choose different one!"
            );
        }

        const existingEmail = await User.findOne({
            email: email,
        }).exec();

        if (existingEmail) {
            throw createHttpError(
                409,
                "Email already exists. Please, choose a different one or login"
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(rawPassword, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // req.session.userId = newUser._id;

        res.status(201).json({ status: 201, message: "User created successfully!" });
    } catch (err) {
        next(err);
    }
};

interface SigninBody {
    username?: string;
    password?: string;
}

export const signin: RequestHandler<
    unknown,
    unknown,
    SigninBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters are missing!");
        }

        const user = await User.findOne({ username: username })
            .select("+email +password")
            .exec();

        if (!user) {
            throw createHttpError(401, "There is no such username!");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid password. Try Again!");
        }

        req.session.userId = user._id;
        res.status(201).json({ status: 201, data: { message: "Successfully signed in!" }, user });
    } catch (err) {
        next(err);
    }
};

export const signout: RequestHandler = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err);
        } 
        else {
            res.status(200).json({ message: "Successfully signed out!" });
        }
    })
};
