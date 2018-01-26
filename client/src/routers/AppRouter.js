import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import WishList from "../components/WishList";

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Dashboard} exact={true} />
                <Route path="/wishlist" component={WishList} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
