import { createStore, combineReducers } from "redux";
import wishlistReducer from "../reducers/wishList";
import currentSearchReducer from "../reducers/currentSearch";

export default () => {
    const store = createStore(
        combineReducers({
            wishlist: wishlistReducer,
            currentSearch: currentSearchReducer
        })
    );
    return store;
};
