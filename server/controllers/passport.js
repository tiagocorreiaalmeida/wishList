import local from "passport-local";
import bcrypt from "bcrypt";

import mongoose from "../config/mongoose";
import User from "../models/user";

const LocalStrategy = local.Strategy;

export default passport => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            async (username, password, done) => {
                try {
                    let user = await User.findOne({ email: username });
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                } catch (e) {
                    res.error(500, "unexpected-error", e);
                }
            }
        )
    );
    passport.serializeUser((user, cb) => cb(null, user._id));
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id, { _id: 1 });
        done(null, user);
    });
};
