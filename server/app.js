import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import errorHandler from "./utils/errorHandler";
import mongoose from "./config/mongoose";
import idgb from "./routes/idgb";
import user from "./routes/user";
import passportConfig from "./controllers/passport";

const app = express(),
    port = process.env.PORT || 3000;

passportConfig(passport);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "/../client/build")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.options("*", cors());

app.use(errorHandler);

app.use("/api/idgb", idgb);
app.use("/api/user", user);

app.listen(port, () => console.log(`Running on port ${port}`));
