export const setSearch = (search = {}) => ({
    type: "SET_SEARCH",
    search
});

export const removeGameFromSearch = ({ id } = {}) => ({
    type: "REMOVE_SEARCH_GAME",
    id
});
