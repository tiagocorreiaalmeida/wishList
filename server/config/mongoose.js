import mongoose from "mongoose";

mongoose.Promise = global.Promise;

async function db() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB running");
    } catch (e) {
        console.log(`DB ON CONNECT ERROR: ${e}`);
    }
}

db();

mongoose.set("debug", true);

export default mongoose;
