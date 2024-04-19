import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    DATABASE_URL: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    FRONTEND_URL: str(),
});
