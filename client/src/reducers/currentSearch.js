const defaultState = {
    search: "",
    offset: 0,
    games: [],
    searching: false,
    complete: false,
    lastSearch: ""
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return action.search;
        case "REMOVE_SEARCH_GAME":
            return {
                ...state,
                games: state.games.filter(({ id }) => id !== action.id)
            };
        case "UPDATE_SEARCH":
            return {
                ...state,
                ...action.updates
            };
        default:
            return state;
    }
};
