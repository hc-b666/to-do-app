import app from "./app";
import env from "./config/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
    .connect(env.DATABASE_URL)
    .then(() => {
        console.log("DARABASE connected");
        app.listen(port, () => {
            console.log(`Server started running at http://localhost:${port}`);
        });
    })
    .catch(() => {
        console.log("Could not connect to database");
    });
