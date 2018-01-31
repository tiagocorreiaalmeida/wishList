import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import WishList from "../components/WishList";
import LoginPage from "../components/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute
                    path="/dashboard"
                    component={Dashboard}
                    exact={true}
                />
                <PrivateRoute
                    path="/wishlist"
                    component={WishList}
                    exact={true}
                />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
