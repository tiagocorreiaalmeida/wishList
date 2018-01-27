import express from "express";
import axios from "axios";

const router = express.Router();

router.get("", (req, res) => {
    let offset = req.query.offset;
    let search = req.query.search;
    axios
        .get(
            `${
                process.env.REQUEST_URL
            }=${search}&fields=*&rating:desc&limit=4&offset=${offset}`,
            {
                headers: {
                    "user-key": process.env.IDGB_KEY,
                    Accept: "application/json"
                }
            }
        )
        .then(response => {
            if (response.data.length === 0 && offset > 0)
                return res.error(409, "all-games-listed");
            if (response.data.length === 0) return res.error(409, "not-found");
            let data = response.data.map(ele => ({
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
            //filter the user wishlist missing
            res.send(data);
        })
        .catch(e => res.error(500, "unexpected-error", e));
});

export default router;
