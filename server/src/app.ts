import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import env from "./config/validateEnv";
import usersRouter from "./routes/usersRouter";

const app = express();
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());

app.use(
    session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: env.DATABASE_URL,
        }),
    })
);

app.use("/users", usersRouter);

app.use((req, res, next) => {
    next(createHttpError(404, "Page not found!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);

    let errorMessage  = "An unknown error occured";
    let statusCode = 500;

    if(isHttpError(error)) {
        errorMessage = error.message;
        statusCode = error.status;
    }

    res.status(statusCode).json({ error: errorMessage });
});

export default app;
