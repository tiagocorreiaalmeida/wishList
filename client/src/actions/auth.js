import { setWishList } from "../actions/wishList";
export const login = id => ({
    type: "LOGIN",
    id
});

export const logout = () => ({
    type: "LOGOUT"
});

export const startLogin = userData => {
    return dispatch => {
        dispatch(login(userData._id));
        dispatch(setWishList(userData.wishList));
    };
};
