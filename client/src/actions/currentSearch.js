import { setWishList } from "./wishList";

export const setSearch = (search = {}) => ({
    type: "SET_SEARCH",
    search
});

export const removeGameFromSearch = id => ({
    type: "REMOVE_SEARCH_GAME",
    id
});

export const editGameSearch = updates => ({
    type: "UPDATE_SEARCH",
    updates
});
