import express from "express";
import axios from "axios";

import User from "../models/user";
import auth from "../utils/auth";

const router = express.Router();

router.get("", auth, (req, res) => {
    let offset = req.query.offset;
    let search = req.query.search;
    let responseData;
    let data;

    async function request() {
        try {
            let response = await axios.get(
                `${
                    process.env.REQUEST_URL
                }=${search}&fields=*&rating:desc&limit=4&offset=${offset}`,
                {
                    headers: {
                        "user-key": process.env.IDGB_KEY,
                        Accept: "application/json"
                    }
                }
            );
            let userGamesList = await User.findById(req.user.id, {
                _id: 0,
                wishList: 1
            });
            if (userGamesList.wishList.length > 0 && response.data.length > 0) {
                responseData = response.data.filter(ele =>
                    userGamesList.wishList.every(value => value.id !== ele.id)
                );
            } else {
                responseData = [...response.data];
            }
            if (responseData.length === 0 && offset > 0)
                return res.error(409, "all-games-listed");
            if (responseData.length === 0) return res.error(409, "not-found");

            data = responseData.map(ele => ({
                id: ele.id,
                name: ele.name,
                url: ele.url,
                summary:
                    ele.summary && ele.summary.length > 256
                        ? ele.summary.slice(0, 253) + "..."
                        : ele.summary,
                cover: ele.cover
                    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
                          ele.cover.cloudinary_id
                      }.jpg`
                    : "",
                rating: ele.total_rating ? ele.total_rating.toFixed(1) : "N/A"
            }));
        } catch (e) {
            res.error(500, "unexpected-error", e);
        } finally {
            res.send(data);
        }
    }
    request();
});

export default router;
