import express from "express";
import expressWinston from "express-winston";
import passport from "passport";
import dotenv from "dotenv";
import { BasicStrategy } from "passport-http";
import { AddressController } from "./controllers/AddressController";
import logger from "./logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const USERNAME = process.env.AUTH_USER || "admin";
const PASSWORD = process.env.AUTH_PASS || "password";

const controller = new AddressController();

app.use(passport.initialize());
passport.use(
    new BasicStrategy((username, password, done) => {
        if (username === USERNAME && password === PASSWORD) {
            return done(null, { username });
        }
        return done(null, false);
    })
);

app.use(
    expressWinston.logger({
        winstonInstance: logger,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: false,
    })
);

app.get("/address/:id",
    passport.authenticate("basic", { session: false }),
    controller.getAddress);

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
