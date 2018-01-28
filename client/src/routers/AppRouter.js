import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import WishList from "../components/WishList";
import Login from "../components/Login";
//header missing
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={Login} exact={true} />
                <Route path="/wishlist" component={WishList} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
