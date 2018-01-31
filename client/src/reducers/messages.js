const messagesDefaultState = {
    error: "",
    success: ""
};
export default (state = messagesDefaultState, action) => {
    switch (action.type) {
        case "SET_MESSAGES":
            return action.messages;
        default:
            return state;
    }
};
