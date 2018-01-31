import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import wishlistReducer from "../reducers/wishList";
import currentSearchReducer from "../reducers/currentSearch";
import authReducer from "../reducers/auth";
import messagesReducer from "../reducers/messages";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            wishList: wishlistReducer,
            currentSearch: currentSearchReducer,
            auth: authReducer,
            messages: messagesReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
