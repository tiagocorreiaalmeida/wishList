export default (state = [], action) => {
    switch (action.type) {
        case "ADD_GAME":
            return [...state, action.game];
        case "REMOVE_GAME":
            return state.filter(({ id }) => id !== action.id);
        case "SET_WISHLIST":
            return [...action.wishList];
        default:
            return state;
    }
};
