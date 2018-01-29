export const addGame = game => ({
    type: "ADD_GAME",
    game
});

export const removeGame = ({ id } = {}) => ({
    type: "REMOVE_GAME",
    id
});

export const setWishList = (wishList = {}) => ({
    type: "SET_WISHLIST",
    wishList
});
