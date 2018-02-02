import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import passport from "passport";

import User from "../models/user";
import auth from "../utils/auth";

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        res.send(user);
    } catch (e) {
        res.error(500, "unexpected-error", e);
    }
});

router.post("/new", auth, async (req, res) => {
    let newGame = Object.assign({}, req.body);
    let game;
    try {
        let alreadyOwnsGame = await User.findOne({
            _id: req.user.id,
            "wishList.id": newGame.id
        });
        if (alreadyOwnsGame) return res.error(409, "game-already-owned");
        await User.findByIdAndUpdate(
            req.user.id,
            { $push: { wishList: newGame } },
            { new: true }
        );
    } catch (e) {
        res.error(500, "unexpected-error", e);
    } finally {
        res.send(newGame);
    }
});

router.delete("/:id", auth, async (req, res) => {
    let gameID = Number(req.params.id);
    try {
        let userOwnsGame = await User.findOne({
            _id: req.user.id,
            "wishList.id": gameID
        });
        if (!userOwnsGame) return res.error(409, "game-not-found");
        await User.update(
            { _id: req.user.id },
            { $pull: { wishList: { id: gameID } } }
        );
    } catch (e) {
        res.error(500, "unexpected-error", e);
    } finally {
        res.send();
    }
});

router.post("/register", async (req, res) => {
    let email = req.body.email;
    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password, salt);
    if (!validator.isEmail(email)) return res.error(400, "invalid-email");
    try {
        let user = await User.findOne({ email });
        if (user) return res.error(409, "email-exists");

        await User.create({
            email,
            password
        });
    } catch (e) {
        res.error(500, "unexpected-error", e);
    } finally {
        res.status(201).send();
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (!user || err) return res.error(401, "login-failed");
        req.logIn(user, e => {
            if (err) return res.error(401, "login-failed");
            res.send(user);
        });
    })(req, res, next);
});

router.get("/logout", auth, (req, res) => {
    req.logOut();
    req.session.destroy();
    res.send();
});

router.patch("/update-password", auth, async (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password, salt);
    try {
        await User.update({ _id: req.user.id }, { password });
        res.send();
    } catch (e) {
        res.error(500, "unexpected-error", e);
    }
});

export default router;
