import { setWishList } from "../actions/wishList";
import { editGameSearch } from "../actions/currentSearch";
import { setMessages } from "../actions/messages";
import axios from "axios";

export const login = id => ({
    type: "LOGIN",
    id
});

export const logout = () => ({
    type: "LOGOUT"
});

export const startLogin = userData => {
    return dispatch => {
        dispatch(login(userData._id));
        dispatch(setWishList(userData.wishList));
    };
};

export const startLogout = () => {
    return async dispatch => {
        try {
            await axios.get("/api/user/logout");
            dispatch(logout());
            dispatch(
                editGameSearch({
                    search: "",
                    offset: 0,
                    games: [],
                    searching: false,
                    complete: false,
                    lastSearch: ""
                })
            );
            dispatch(setWishList());
        } catch (e) {
            dispatch(
                setMessages({
                    error:
                        "Something went wrong please refresh the page and try again",
                    success: ""
                })
            );
        }
    };
};
