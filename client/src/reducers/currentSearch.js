const defaultState = {
    search: "",
    error: "",
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
            let games = state.games.filter(ele => ele.id !== action.id);
            return {
                ...state,
                games
            };
        default:
            return state;
    }
};
