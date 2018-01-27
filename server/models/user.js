import mongoose from "mongoose";
import moment from "moment";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: String,
        default: moment().valueOf()
    },
    wishList: {
        type: Array,
        default: []
    }
});

const User = mongoose.model("User", UserSchema);

export default User;
