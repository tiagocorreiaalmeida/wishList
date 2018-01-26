import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import errorHandler from "./utils/errorHandler";
import idgb from "./routes/idgb";

const app = express(),
    port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.options("*", cors());

app.use(errorHandler);

app.use("/api/idgb", idgb);



app.listen(port, () => console.log(`Running on port ${5000}`));
