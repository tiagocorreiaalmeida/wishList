import axios from "axios";
import { editGameSearch } from "./currentSearch";
import { setMessages } from "./messages";

export const addGame = game => ({
    type: "ADD_GAME",
    game
});

export const removeGame = id => ({
    type: "REMOVE_GAME",
    id
});

export const setWishList = (wishList = []) => ({
    type: "SET_WISHLIST",
    wishList
});

export const addGameSync = game => {
    return async dispatch => {
        try {
            await axios.post("/api/user/new", {
                ...game
            });
            dispatch(addGame(game));
            dispatch(
                setMessages({
                    error: "",
                    success: "Game added with success to your wishlist"
                })
            );
        } catch (e) {
            let error;
            switch (e) {
                case "game-already-owned":
                    error = "You allready own the book you are trying to add!";
                    break;
                default:
                    error =
                        "Something went wrong please refresh the page and try again";
            }
            dispatch(
                setMessages({
                    error,
                    success: ""
                })
            );
        }
    };
};

export const removeGameSync = id => {
    return async dispatch => {
        try {
            await axios.delete(`/api/user/${id}`);
            dispatch(removeGame(id));
            dispatch(
                setMessages({
                    error: "",
                    success: "Game removed with success from your wishlist"
                })
            );
        } catch (e) {
            let error;
            switch (e) {
                case "game-not-found":
                    error = "The game you tried to remove doesnt exist!";
                    break;
                default:
                    error =
                        "Something went wrong please refresh the page and try again";
            }
            dispatch(
                setMessages({
                    error,
                    success: ""
                })
            );
        }
    };
};
