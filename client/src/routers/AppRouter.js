import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Dashboard from "../components/Dashboard";
import WishList from "../components/WishList";
import LoginPage from "../components/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
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
    </Router>
);

export default AppRouter;
